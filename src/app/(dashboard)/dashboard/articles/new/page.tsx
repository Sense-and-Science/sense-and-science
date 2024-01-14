'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { OutputData } from '@editorjs/editorjs';

const Editor = dynamic(
  () => import('../../../../../components/blog/ArticleEditor'),
  {
    ssr: false,
  }
);

type NewArticleInputs = {
  title: string;
  description: string;
  slug: string;
};

export default function NewArticle() {
  const {
    handleSubmit,
    register: registerInput,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<NewArticleInputs>();

  const [data, setData] = useState<OutputData>();

  const onSubmit: SubmitHandler<NewArticleInputs> = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className='my-8 text-3xl'>Write a new article</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input
            id='title'
            {...registerInput('title', {
              required: 'Title is required',
              minLength: {
                value: 2,
                message: 'Minimum length should be 65 for SEO purposes',
              },
            })}
            type='text'
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.slug}>
          <FormLabel htmlFor='slug'>Slug (a url friendly string)</FormLabel>
          <Input
            id='slug'
            {...registerInput('slug', {
              required: 'Slug is required',
              minLength: {
                value: 2,
                message: 'Minimum length should be 65 for SEO purposes',
              },
            })}
            type='text'
          />
          <FormErrorMessage>
            {errors.slug && errors.slug.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor='description'>Description (For SEO)</FormLabel>
          <Textarea
            id='description'
            {...registerInput('description', {
              required: 'Description is required',
              minLength: {
                value: 2,
                message: 'Minimum length should be 65 for SEO purposes',
              },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
      </form>
      <Editor data={data} holder='editorjs-container' onChange={setData} />
    </div>
  );
}
