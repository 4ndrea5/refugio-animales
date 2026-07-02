import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useSolicitudesAdmin = () => {
  return useQuery({
    queryKey: ['solicitudes-admin'],
    queryFn: async () => {
      const respuesta = await api.get('/solicitudes');
      return respuesta.data;
    },
  });
};