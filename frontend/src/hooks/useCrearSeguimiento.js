import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearSeguimiento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/seguimientos', datos);
      return respuesta.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['seguimientos', variables.id_adopcion] });
    },
  });
};