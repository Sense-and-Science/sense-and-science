'use client';

import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, LegacyRef, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import { services } from '@/services';
import { useAuthStore } from '@/stores';
import { uploadFileByFileForBlog } from '@/utils';
import {
    Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea, useInterval,
    useTimeout
} from '@chakra-ui/react';

import type ReactQuill from 'react-quill';
const ReactQuillEditor = dynamic(
  async () => {
    const { default: RQ, defaultProps } = await import('react-quill');
    type QuillProps = {
      forwardedRef: LegacyRef<ReactQuill> | undefined;
      value: string;
      onChange: Dispatch<SetStateAction<string>>;
    } & typeof defaultProps;
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: QuillProps) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false }
);

type NewArticleInputs = {
  title: string;
  description: string;
  slug: string;
  coverImage: FileList;
};

export default function NewArticle() {
  const { user } = useAuthStore();

  const router = useRouter()

  const {
    handleSubmit,
    register: registerInput,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    watch,
    setFocus,
    getValues,
    clearErrors,
  } = useForm<NewArticleInputs>();

  const [content, setContent] = useState('');
  const [usedImageIds, setUsedImageIds] = useState<string[]>([]);
  const [titleLength, setTitleLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');

  const { ref: registerRef, ...restOfTheInputParams } = registerInput(
    'coverImage',
    { required: { value: true, message: 'Cover image is required' } }
  );

  const handleUploadedFile = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      const urlImage = URL.createObjectURL(file);
      setCoverImagePreview(urlImage);
    } else {
      setCoverImagePreview('');
    }
  };

  const editorRef = useRef<ReactQuill>(null);

  const formValues = watch();
  useEffect(() => {
    const titleValue = (formValues.title || '').trim();
    const descriptionValue = formValues.description;
    if (titleValue) {
      setTitleLength(titleValue.length);
      const slugValue = titleValue.toLowerCase().split(' ').join('-');

      if (formValues.slug !== slugValue) {
        setValue('slug', slugValue);
      }
    }

    if (descriptionValue) {
      setDescriptionLength(descriptionValue.length);
    }
  }, [formValues, setValue]);

  const onSubmit: SubmitHandler<NewArticleInputs> = async (values) => {
    if (content.trim().length !== 0 && user) {
      const { result, error } = await services.articles.createArticle({
        content,
        description: values.description,
        slug: values.slug,
        imageIds: usedImageIds,
        title: values.title.trim(),
        userId: user.uid,
        coverImage: values.coverImage
      });
      if (error) {
        if ((error as Error).message === 'Title already exists') {
          toast('Title already exists', {
            type: 'error',
          });
          setError('title', { message: 'Title already exists' });
          setFocus('title');
        } else {
          toast('Something went wrong, please try again later', {
            type: 'error',
          });
          console.log((error as Error).message);
        }
      }
      if (result) {
        clearErrors();
        toast('Article successfully submitted', { type: 'success' });
        router.replace("/dashboard/articles/my-articles")
      }
    }
  };

  async function saveDraft() {
    const values = getValues();
    console.log(values);
    const titleValue = values.title || '';
    const descriptionValue = values.description || '';
    const slugValue = values.slug || '';
    const coverImageValue = values.coverImage || null
    if (
      titleValue.trim().length > 50 &&
      descriptionValue.trim().length > 150 &&
      slugValue &&
      content.trim().length !== 0 &&
      coverImageValue &&
      user
    ) {
      const { result, error } = await services.articles.createArticleDraft({
        content,
        description: descriptionValue,
        slug: slugValue,
        imageIds: usedImageIds,
        title: titleValue,
        userId: user.uid,
        coverImage: coverImageValue
      });
      if (error) {
        if ((error as Error).message === 'Title already exists') {
          toast('Title already exists', {
            type: 'error',
          });
          setError('title', { message: 'Title already exists' });
          setFocus('title');
        } else {
          toast('Something went wrong, please try again later', {
            type: 'error',
          });
          console.log((error as Error).message);
        }
      }
      if (result) {
        clearErrors();
        toast('Draft successfully saved', { type: 'success' });
      }
    }
  }

  useInterval(saveDraft, 30000);

  const quillImageCallback = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      let data: Awaited<ReturnType<typeof uploadFileByFileForBlog>>;

      const quillObj = editorRef?.current?.getEditor();
      const range = quillObj?.getSelection();

      if (file) {
        data = await uploadFileByFileForBlog(file);
        if (data.success === 1) {
          if (quillObj && range) {
            quillObj.insertEmbed(range.index, 'image', data.file.url);
            setUsedImageIds((ids) => {
              return [...ids, data.file.fileId];
            });
          }
        }
      }
    };
  };

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['image', 'link'],
          [
            {
              color:
                '#000000,#e60000,#ff9900,#ffff00,#008a00,#0066cc,#9933ff,#ffffff,#facccc,#ffebcc,#ffffcc,#cce8cc,#cce0f5,#ebd6ff,#bbbbbb,#f06666,#ffc266,#ffff66,#66b966,#66a3e0,#c285ff,#888888,#a10000,#b26b00,#b2b200,#006100,#0047b2,#6b24b2,#444444,#5c0000,#663d00,#666600,#003700,#002966,#3d1466'.split(
                  ','
                ),
            },
          ],
        ],
        handlers: {
          image: quillImageCallback,
        },
      },
    }),
    []
  );

  return (
    <div className='pb-16'>
      <h1 className='my-8 text-3xl'>Write a new article</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input
            id='title'
            {...registerInput('title', {
              required: 'Title is required',
              minLength: {
                value: 50,
                message: 'Minimum length should be 50 for SEO purposes',
              },
              maxLength: {
                value: 60,
                message: 'Maximum length should be 60 for SEO purposes',
              },
            })}
            type='text'
          />
          <FormHelperText
            style={{
              color: titleLength > 60 || titleLength < 50 ? 'red' : '',
            }}
          >{`${titleLength} of 50-60 characters`}</FormHelperText>
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.slug}>
          <FormLabel htmlFor='slug'>
            Slug (a url friendly string,auto generated from the title)
          </FormLabel>
          <Input
            id='slug'
            {...registerInput('slug', {
              required: 'Slug is required',
            })}
            readOnly
            disabled
            type='text'
          />
          <FormErrorMessage>
            {errors.slug && errors.slug.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.coverImage}>
          <FormLabel htmlFor='cover-image'>Upload the cover image</FormLabel>
          <Input
            id='cover-image'
            {...restOfTheInputParams}
            onChange={handleUploadedFile}
            ref={(e) => {
              registerRef(e);
            }}
            type='file'
            accept='image/*'
          />
          <FormErrorMessage>
            {errors.coverImage && errors.coverImage.message}
          </FormErrorMessage>
        </FormControl>
        {coverImagePreview !== '' ? (
          <Image
            src={coverImagePreview}
            alt='preview of profile picture'
            width={'250'}
            height={'250'}
            className='mx-auto aspect-square h-auto rounded-full object-cover'
          />
        ) : null}

        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor='description'>Description (For SEO)</FormLabel>
          <Textarea
            id='description'
            {...registerInput('description', {
              required: 'Description is required',
              minLength: {
                value: 150,
                message: 'Minimum length should be 65 for SEO purposes',
              },
              maxLength: {
                value: 160,
                message: 'Maximum length should be 160 for SEO purposes',
              },
            })}
          />
          <FormHelperText
            style={{
              color:
                descriptionLength > 160 || descriptionLength < 150 ? 'red' : '',
            }}
          >{`${descriptionLength} of 150-165 characters`}</FormHelperText>
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <div>
          <FormLabel>Content (What you see is what you get)</FormLabel>
          {/* <Editor data={data} holder='editorjs-container' onChange={setData} /> */}
          <ReactQuillEditor
            forwardedRef={editorRef}
            theme='snow'
            value={content}
            onChange={setContent}
            readOnly={false}
            modules={quillModules}
          />
        </div>
        <div className='flex items-center justify-end'>
          <Button
            type='submit'
            colorScheme='teal'
            isLoading={isSubmitting}
            loadingText='Submitting'
          >
            Submit to be reviewed
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
