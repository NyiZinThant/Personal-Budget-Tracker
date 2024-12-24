import axios from 'axios';
import { AuthType, LoginType, UserDetail } from '../models/auth';
export type CustomError = Error & { status?: number };
const url = import.meta.env.VITE_API_URL;
export const loginUser = async (
  values: LoginType
): Promise<AuthType | null> => {
  try {
    const response = await axios.post<AuthType>(`${url}/api/v1/login`, {
      ...values,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const newError: CustomError = new Error(error.response?.data.message);
      newError.status = error.status;
      throw newError;
    } else {
      console.error(error);
    }
  }
  return null;
};

export const registerUser = async function (
  newUser: UserDetail
): Promise<void> {
  try {
    await axios.post(`${url}/api/v1/register`, {
      ...newUser,
      dob: newUser.dob.format('YYYY-MM-DD'),
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const newError: CustomError = new Error(error.response?.data.message);
      newError.status = error.status;
      throw newError;
    } else {
      console.error(error);
    }
  }
};
