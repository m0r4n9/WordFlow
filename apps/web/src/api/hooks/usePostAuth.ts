import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { $api } from '../api';

type AuthType = 'login' | 'register';

interface BaseCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends BaseCredentials {
  username: string;
}

type AuthCredentials = BaseCredentials | SignUpCredentials;

interface SignInResponse {
  accessToken: string;
}

interface SignInError {
  message: string;
  error: string;
  statusCode: number;
}

export const useAuth = (type: AuthType) => {
  return useMutation<SignInResponse, AxiosError<SignInError>, AuthCredentials>({
    mutationFn: async (credentials) => {
      const response = await $api.post(`/auth/${type}`, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
    },
  });
};
