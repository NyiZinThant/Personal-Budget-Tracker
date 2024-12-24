import { createContext, ReactNode, useContext, useState } from 'react';
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { AuthType, LoginType, User, UserDetail } from '../models/auth';
import { CustomError, loginUser, registerUser } from '../api/authApi';
import { useNavigate } from 'react-router';
import { storeToken } from '../libs/localStorage';

type AuthProviderType = {
  children: ReactNode;
};
type RegisterContextType = {
  registerUserMutate: UseMutateAsyncFunction<
    void,
    unknown,
    UserDetail,
    unknown
  >;
  isError: boolean;
  error: CustomError;
};
type LoginContextType = {
  loginUserMutate: UseMutateAsyncFunction<
    AuthType | null,
    unknown,
    LoginType,
    unknown
  >;
  isError: boolean;
  error: CustomError;
};

const AuthContext = createContext<User | null>(null);
const RegisterContext = createContext<RegisterContextType | null>(null);
const LoginContext = createContext<LoginContextType | null>(null);

const AuthProvider = function ({ children }: AuthProviderType) {
  const [user, setUser] = useState<User>();
  const {
    mutateAsync: registerUserMutate,
    isError: isRegisterError,
    error: registerError,
  } = useMutation({
    mutationFn: registerUser,
  });
  const {
    mutateAsync: loginUserMutate,
    isError: isLoginError,
    error: loginError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      storeToken(data?.token ?? '');
    },
  });
  return (
    <AuthContext.Provider value={user ?? null}>
      <RegisterContext.Provider
        value={{
          registerUserMutate,
          isError: isRegisterError,
          error: registerError as CustomError,
        }}
      >
        <LoginContext.Provider
          value={{
            loginUserMutate,
            isError: isLoginError,
            error: loginError as CustomError,
          }}
        >
          {children}
        </LoginContext.Provider>
      </RegisterContext.Provider>
    </AuthContext.Provider>
  );
};
export const useAuth = function () {
  return useContext(AuthContext);
};
export const useRegister = function () {
  return useContext(RegisterContext);
};
export const useLogin = function () {
  return useContext(LoginContext);
};
export default AuthProvider;
