import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { $api } from '../api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

interface SignInError {
  message: string;
  error: string;
  statusCode: number;
}

export const usePostSignIn = () => {
  return useMutation<
    SignInResponse,
    AxiosError<SignInError>,
    SignInCredentials
  >({
    mutationFn: async (credentials) => {
      const response = await $api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
    },
  });
};
