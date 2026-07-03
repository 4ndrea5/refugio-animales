import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearSolicitud = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/solicitudes', datos);
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['solicitudes-mias'] });
      queryClient.invalidateQueries({ queryKey: ['animales'] });
    },
  });
};