import { useMutation } from '@tanstack/react-query';
import api from '../services/api';

export const useRegistro = () => {
  return useMutation({
    mutationFn: async (datos) => {
      const respuesta = await api.post('/usuarios/registrar', datos);
      return respuesta.data;
    },
  });
};