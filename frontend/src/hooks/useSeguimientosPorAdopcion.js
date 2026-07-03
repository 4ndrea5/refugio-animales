import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useSeguimientosPorAdopcion = (idAdopcion) => {
  return useQuery({
    queryKey: ['seguimientos', idAdopcion],
    queryFn: async () => {
      const respuesta = await api.get(`/seguimientos/adopcion/${idAdopcion}`);
      return respuesta.data;
    },
    enabled: !!idAdopcion,
  });
};