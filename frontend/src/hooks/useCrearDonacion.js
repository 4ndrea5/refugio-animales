import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearDonacion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/donaciones', datos);
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donaciones-admin'] });
    },
  });
};