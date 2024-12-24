import axios from 'axios';
import { Category } from '../models/category';
import axiosInstance from '../axioConfig';

const url = import.meta.env.VITE_API_URL;
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>(
      `${url}/api/v1/categories`
    );
    const categories: Category[] = response.data;
    return categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);
    } else {
      console.error(error);
    }
    return [];
  }
};
