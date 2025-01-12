import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { AuthForm, AuthFormType } from '@/components/Auth';

export const Route = createLazyFileRoute('/auth/signIn')({
  component: SignInComponent,
});

function SignInComponent() {
  const [authForm, setAuthForm] = useState<AuthFormType>('login');

  const toggleForm = () =>
    setAuthForm((prevState) => (prevState === 'login' ? 'register' : 'login'));

  return (
    <div className='flex h-screen items-center justify-center'>
      <AuthForm activeForm={authForm} toggleForm={toggleForm} />
    </div>
  );
}

SignInComponent.displayName = 'SignInComponent';
