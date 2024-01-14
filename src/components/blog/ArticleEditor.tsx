// @ts-nocheck
'use client';

import InlineImage from 'editorjs-inline-image';
import React, { useEffect, useRef } from 'react';

import { uploadFileByFileForBlog } from '@/utils';
import CheckList from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import EditorJS, { API, BlockMutationEvent, OutputData } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';

const EDITOR_TOOLS = {
  code: Code,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a Header',
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  paragraph: Paragraph,
  checklist: CheckList,
  embed: Embed,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: '/api', // Replace with your actual upload endpoint
      },

      uploader: {
        uploadByFile(file) {
          return uploadFileByFileForBlog(file).then((data) => {
            return data;
          });
        },
      },
    },
  },
  // inlineImage: {
  //   class: InlineImage,
  //   inlineToolbar: true,
  //   config: {
  //     embed: {
  //       display: true,
  //     },
  //     // unsplash: {
  //     //   appName: 'your_app_name',
  //     //   clientId: 'your_client_id'
  //     // }
  //   }
  // },
  inlineCode: InlineCode,
  link: Link,
  list: List,
  quote: Quote,
  simpleImage: SimpleImage,
  delimiter: Delimiter,
};

interface ArticleEditorProps {
  data: OutputData | undefined;
  onChange: (data: OutputData) => void;
  holder: string;
}

export default function ArticleEditor({
  data,
  onChange,
  holder,
}: ArticleEditorProps) {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          console.log(data);
          onChange(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={holder} className='prose max-w-full' />;
}
