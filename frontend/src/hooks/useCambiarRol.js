import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCambiarRol = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, rol }) => {
      const respuesta = await api.put(`/usuarios/${id}/rol`, { rol });
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};