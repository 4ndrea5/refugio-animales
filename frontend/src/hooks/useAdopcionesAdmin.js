import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useAdopcionesAdmin = () => {
  return useQuery({
    queryKey: ['adopciones-admin'],
    queryFn: async () => {
      const respuesta = await api.get('/adopciones');
      return respuesta.data;
    },
  });
};