import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCambiarEstadoSolicitud = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, estado }) => {
      const respuesta = await api.put(`/solicitudes/${id}/estado`, { estado });
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['solicitudes-admin'] });
      queryClient.invalidateQueries({ queryKey: ['adopciones-admin'] });
      queryClient.invalidateQueries({ queryKey: ['animales'] });
    },
  });
};