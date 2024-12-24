import { Dayjs } from 'dayjs';

export type AuthType = {
  token: string;
  user: User;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
};

export type UserDetail = {
  fullName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: Dayjs;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};
