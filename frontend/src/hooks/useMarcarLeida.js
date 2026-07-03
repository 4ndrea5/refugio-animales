import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useMarcarLeida = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const respuesta = await api.put(`/notificaciones/${id}/leida`);
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificaciones'] });
    },
  });
};