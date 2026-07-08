import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/usuarios/staff', datos);
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};