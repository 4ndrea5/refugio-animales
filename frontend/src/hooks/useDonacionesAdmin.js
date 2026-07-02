import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useDonacionesAdmin = () => {
  return useQuery({
    queryKey: ['donaciones-admin'],
    queryFn: async () => {
      const respuesta = await api.get('/donaciones');
      return respuesta.data;
    },
  });
};