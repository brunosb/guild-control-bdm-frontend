import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR, { ConfigInterface, responseInterface } from 'swr';
import api from '../services/api';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data;
}

export function useFetch<Data = unknown, Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(request && JSON.stringify(request), () => api(request!), {
    ...config,
    initialData: initialData && {
      status: 200,
      statusText: 'InitialData',
      config: request!,
      headers: {},
      data: initialData,
    },
  });
  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  };
}
