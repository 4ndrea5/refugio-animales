import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useAdopcionesMias = () => {
  return useQuery({
    queryKey: ['adopciones-mias'],
    queryFn: async () => {
      const respuesta = await api.get('/adopciones/mias');
      return respuesta.data;
    },
  });
};