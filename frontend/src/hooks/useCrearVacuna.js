import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearVacuna = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/vacunas', datos);
      return respuesta.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vacunas', variables.id_animal] });
      queryClient.invalidateQueries({ queryKey: ['vacunas-proximas'] });
    },
  });
};