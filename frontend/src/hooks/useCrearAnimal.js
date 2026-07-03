import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCrearAnimal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (datosAnimal) => {
      const respuesta = await api.post('/animales', datosAnimal);
      return respuesta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animales'] });
    },
  });
};