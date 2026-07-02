import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useAnimales = () => {
  return useQuery({
    queryKey: ['animales'],
    queryFn: async () => {
      const respuesta = await api.get('/animales');
      return respuesta.data;
    },
  });
};