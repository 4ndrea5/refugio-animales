import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useSolicitudesMias = () => {
  return useQuery({
    queryKey: ['solicitudes-mias'],
    queryFn: async () => {
      const respuesta = await api.get('/solicitudes/mias');
      return respuesta.data;
    },
  });
};