import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useNotificaciones = () => {
  return useQuery({
    queryKey: ['notificaciones'],
    queryFn: async () => {
      const respuesta = await api.get('/notificaciones/mias');
      return respuesta.data;
    },
    refetchInterval: 30000, // revisa cada 30 segundos si hay nuevas
  });
};