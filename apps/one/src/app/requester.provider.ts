import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class RequesterProvider {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://www.googleapis.com/books/v1',
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response?.data?.message || 'An error occurred while making the request';
        throw new HttpException(message, statusCode);
      },
    );
  }

  async get<T>(params: {q: string}): Promise<T> {
    const {data} = await this.axiosInstance.get<T>('volumes', {params});

    return data;
  }
}
