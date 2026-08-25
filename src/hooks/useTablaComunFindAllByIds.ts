import { useQuery, type  UseQueryResult } from '@tanstack/react-query';
import { TablaComunService } from '../services';
import type { TablaComunFilter, TablaComunResponse } from '../types';
import { TABLA_COMUN_FIND_ALL_BY_IDS } from './QueryKeys';

const useTablaComunFindAllByIds = (
	filter: TablaComunFilter,
): UseQueryResult<TablaComunResponse[], Error> => {
	const response = useQuery({
		queryKey: [TABLA_COMUN_FIND_ALL_BY_IDS, filter],
		queryFn: async () => await TablaComunService.findAllByIds(filter),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default useTablaComunFindAllByIds;
