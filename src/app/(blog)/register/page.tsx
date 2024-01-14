'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { services } from '@/services';
import { Link } from '@chakra-ui/next-js';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

type SignupInputs = {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: FileList;
};

function Register() {
  useEffect(() => {
    fetch('/api/get-key')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const {
    handleSubmit,
    register: registerInput,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupInputs>();

  const [preview, setPreview] = useState<string>('');
  const { ref: registerRef, ...restOfTheInputParams } = registerInput(
    'avatar',
    { required: { value: true, message: 'Profile picture is required' } }
  );

  const handleUploadedFile = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
    } else {
      setPreview('');
    }
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupInputs> = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError(
        'password',
        {
          message: "Password and confirm password doesn't match",
        },
        { shouldFocus: true }
      );
      setError('confirmPassword', {
        message: "Password and confirm password doesn't match",
      });
      return;
    }
    const { result, error } = await services.users.createUser({
      firstName: values.firstName,
      lastName: values.lastName,
      avatar: values.avatar,
      contactNo: values.contactNo,
      email: values.email,
      password: values.password,
    });

    if (error) {
      alert((error as Error).message);
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push('/admin');
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[100%] sm:w-[80%] md:w-[70%] lg:w-[60%]'>
        <h1 className='my-6 text-center text-4xl font-bold'>
          Want to become an author?
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel htmlFor='firstName'>First name</FormLabel>
              <Input
                id='firstName'
                {...registerInput('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 2',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor='lastName'>Last name</FormLabel>
              <Input
                id='lastName'
                {...registerInput('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 2',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </div>

          <FormControl isInvalid={!!errors.contactNo}>
            <FormLabel htmlFor='contactNo'>Contact No</FormLabel>
            <Input
              id='contactNo'
              {...registerInput('contactNo', {
                required: 'Contact no is required',
                pattern: {
                  value: /^07\d{8}$/,
                  message: 'Has to be of format 07********',
                },
              })}
            />
            <FormErrorMessage>
              {errors.contactNo && errors.contactNo.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              {...registerInput('email', {
                required: 'Email is required',
                minLength: { value: 2, message: 'Minimum length should be 2' },
                pattern: {
                  value:
                    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/,
                  message: 'Valid email required',
                },
              })}
              type='email'
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                {...registerInput('password', {
                  required: 'This is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 8',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
              <Input
                id='confirmPassword'
                {...registerInput('confirmPassword', {
                  required: 'This is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 8',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
          </div>
          <FormControl isInvalid={!!errors.avatar}>
            <FormLabel htmlFor='avatar'>Choose a profile picture</FormLabel>
            <Input
              id='avatar'
              {...restOfTheInputParams}
              onChange={handleUploadedFile}
              ref={(e) => {
                registerRef(e);
              }}
              type='file'
              accept='image/*'
            />
            <FormErrorMessage>
              {errors.avatar && errors.avatar.message}
            </FormErrorMessage>
          </FormControl>
          {preview !== '' ? (
            <Image
              src={preview}
              alt='preview of profile picture'
              width={'250'}
              height={'250'}
              className='mx-auto aspect-square h-auto rounded-full object-cover'
            />
          ) : null}

          <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Submit
          </Button>
          <Link href={'/login'} className='text-blue-500'>
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
