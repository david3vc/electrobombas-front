import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type PozoResponse } from '../../../types';
import { POZO_FIND_BY_ID } from './QueryKeys';
import { PozoService } from '../../../services';

const usePozoFindById = (id?: number): UseQueryResult<PozoResponse, Error> => {
	const response = useQuery({
		queryKey: [POZO_FIND_BY_ID, id],
		queryFn: async () => await PozoService.findById(Number(id)),
		enabled: !(id == null),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default usePozoFindById;
