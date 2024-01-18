'use client';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { services } from '@/services';
import { useAuthStore } from '@/stores';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

type BecomeAnAuthorInputs = {
  reason: string;
};

function BecomeAnAuthor() {
  const { user, setUser } = useAuthStore();

  const {
    handleSubmit,
    register: registerInput,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<BecomeAnAuthorInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<BecomeAnAuthorInputs> = async (values) => {
    if (user) {
      const { result, error } =
        await services.authorApplications.createAuthorApplication({
          reason: values.reason,
          userId: user.uid,
        });
      if (result) {
        alert(
          'Your application was successfully submitted, you will be contacted upon confirmation'
        );
        const { result, error } = await services.users.getUser(user.uid);
        if (!error && result) {
          setUser(user, result);
          router.replace('/');
        }
      } else if (error) {
        setError('root', { message: 'Something went wrong' });
      }
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <title>Become an Author | Sense & Science</title>
      <meta name='description' content='Become an author in the Sense & Science blog' />
      <div className='w-[100%] sm:w-[80%] md:w-[70%] lg:w-[40%]'>
        <h1 className='my-6 text-center text-4xl font-bold'>
          Do you want to be an author?
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <FormControl isInvalid={!!errors.reason}>
            <FormLabel htmlFor='email'>
              Why do you want to be an author at Sense & Science?{' '}
            </FormLabel>
            <Input
              id='reason'
              {...registerInput('reason', {
                required: 'Reason is required',
                minLength: { value: 2, message: 'Minimum length should be 2' },
              })}
            />
            <FormErrorMessage>
              {errors.reason && errors.reason.message}
            </FormErrorMessage>
          </FormControl>
          <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Submit your application
          </Button>
        </form>
      </div>
    </div>
  );
}

export default BecomeAnAuthor;
