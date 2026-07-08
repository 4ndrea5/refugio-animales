import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useUsuarios = () => {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const respuesta = await api.get('/usuarios');
      return respuesta.data;
    },
  });
};