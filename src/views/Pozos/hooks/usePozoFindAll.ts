import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type PozoResponse } from '../../../types';
import { POZO_FIND_ALL } from './QueryKeys';
import { PozoService } from '../../../services';

const usePozoFindAll = (): UseQueryResult<PozoResponse[], Error> => {
	const response = useQuery({
		queryKey: [POZO_FIND_ALL],
		queryFn: async () => await PozoService.findAll(),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	return response;
};

export default usePozoFindAll;
