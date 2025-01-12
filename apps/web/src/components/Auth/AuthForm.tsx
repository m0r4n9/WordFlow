import { useNavigate } from '@tanstack/react-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/api/hooks/usePostAuth';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui';

interface BaseCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends BaseCredentials {
  username: string;
}

type AuthCredentials = BaseCredentials | SignUpCredentials;

export type AuthFormType = 'register' | 'login';

interface AuthFormProps {
  activeForm: AuthFormType;
  toggleForm: () => void;
}

export const AuthForm = ({ activeForm, toggleForm }: AuthFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<AuthCredentials>();
  const { mutate: signUp, isSuccess } = useAuth(activeForm);

  const togleVisiblePassword = () => setShowPassword((prevState) => !prevState);

  const onSubmit: SubmitHandler<AuthCredentials> = (data) => signUp(data);

  useEffect(() => {
    if (isSuccess) navigate({ to: '/' });
  }, [isSuccess]);

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>
          {activeForm === 'register' ? 'Register' : 'Login'}
        </CardTitle>
        <CardDescription>
          Enter your email and password to
          {activeForm === 'register'
            ? 'create an account'
            : 'login to your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' tabIndex={1} {...register('email')} />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  tabIndex={2}
                  {...register('password')}
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={togleVisiblePassword}
                >
                  {showPassword ? (
                    <EyeIcon className='h-4 w-4' aria-hidden='true' />
                  ) : (
                    <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
                  )}
                </Button>
              </div>
            </div>
            {activeForm === 'register' && (
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' {...register('username')} />
              </div>
            )}
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          {activeForm === 'register'
            ? 'Already have an account?'
            : "Don't have an account?"}
          <Button
            variant='ghost'
            onClick={toggleForm}
            className='underline underline-offset-4'
          >
            Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

AuthForm.displayName = 'AuthForm';
