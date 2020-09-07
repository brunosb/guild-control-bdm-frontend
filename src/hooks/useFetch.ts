import useSWR from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (urlApi) => {
    const response = await api.get<Data>(urlApi);
    return response.data;
  });

  return { data, error };
}
