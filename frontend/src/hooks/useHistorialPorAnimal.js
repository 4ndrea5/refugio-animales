import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useHistorialPorAnimal = (idAnimal) => {
  return useQuery({
    queryKey: ['historial', idAnimal],
    queryFn: async () => {
      const respuesta = await api.get(`/historial/animal/${idAnimal}`);
      return respuesta.data;
    },
    enabled: !!idAnimal,
  });
};