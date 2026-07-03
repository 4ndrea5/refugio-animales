import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useVacunasPorAnimal = (idAnimal) => {
  return useQuery({
    queryKey: ['vacunas', idAnimal],
    queryFn: async () => {
      const respuesta = await api.get(`/vacunas/animal/${idAnimal}`);
      return respuesta.data;
    },
    enabled: !!idAnimal,
  });
};