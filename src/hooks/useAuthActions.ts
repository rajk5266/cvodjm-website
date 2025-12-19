import { api } from '@/lib/api';
import { LoginCredentials, SignupData } from '@/types/types';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';

export const useAuthActions = () => {
  // const {lang} = useParams();
  const router = useRouter();
  // const setAuth = useAuthStore((state) => state.setAuth);

    const { setAuth,  } = useAuthStore();
  return {
    login: async (credentials: LoginCredentials) => {
      try {
        const response = await api.post('/auth/login', credentials, {
          withCredentials: true,
        });

        const { user } = response.data;
        setAuth(user);  
        router.push(`/`);

        return response.data.user;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Login failed');
      }
    },

    signup: async (userData: SignupData) => {
      try {
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Signup failed');
      }
    },

    isLoading: false,
  };
};
