'use client';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import BlogPage from '@/components/layout/BlogPage';
import { services } from '@/services';
import { Link } from '@chakra-ui/next-js';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

type LoginInputs = {
  email: string;
  password: string;
};

function Login() {
  // const { setUser } = useAuthStore();

  const {
    handleSubmit,
    register: registerInput,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    const { result: userResult, error: loginError } =
      await services.users.login(values.email, values.password);

    if (loginError) {
      alert((loginError as Error).message);
      return console.log(loginError);
    }

    if (userResult) {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userResult.user.getIdToken()}`,
        },
      });

      router.replace('/');
    }
  };

  return (
    <BlogPage>
      <div className='flex items-center justify-center'>
        <title>Login | Sense & Science</title>
        <meta name='description' content='Login to the Sense & Science blog' />
        <div className='w-[100%] sm:w-[80%] md:w-[70%] lg:w-[60%]'>
          <h1 className='my-6 text-center text-4xl font-bold'>
            Welcome back !
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                {...registerInput('email', {
                  required: 'Email is required',
                  minLength: {
                    value: 2,
                    message: 'Minimum length should be 2',
                  },
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
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                {...registerInput('password', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Sign in
            </Button>
            <Link href={'/register'} className='text-blue-500'>
              Don&apos;t have an account yet?
            </Link>
          </form>
        </div>
      </div>
    </BlogPage>
  );
}

export default Login;
