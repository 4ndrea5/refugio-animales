import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useVacunasProximas = () => {
  return useQuery({
    queryKey: ['vacunas-proximas'],
    queryFn: async () => {
      const respuesta = await api.get('/vacunas/proximas');
      return respuesta.data;
    },
  });
};