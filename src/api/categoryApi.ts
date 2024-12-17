import axios from 'axios';
import { category } from '../models/category';

const url = import.meta.env.VITE_API_URL;
export const getCategories = async (): Promise<category[]> => {
  try {
    const response = await axios.get<category[]>(`${url}/api/v1/categories`);
    const categories: category[] = response.data;
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
