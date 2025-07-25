import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types';

export async function login({ username, password }: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('/api/v1/admin/auth/login', {
    username,
    password,
  });
  return response.data;
} 