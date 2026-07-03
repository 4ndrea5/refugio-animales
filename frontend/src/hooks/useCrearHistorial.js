import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearHistorial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/historial', datos);
      return respuesta.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['historial', variables.id_animal] });
    },
  });
};