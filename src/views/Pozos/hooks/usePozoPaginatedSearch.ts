import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { PozoService } from '../../../services';
import type {
	PaginationRequest,
	PaginationResponse,
	PozoFilter,
	PozoResponse,
} from '../../../types';
import { POZO_PAGINATED_SEARCH } from './QueryKeys';

const usePozoPaginatedSearch = (
	paginationRequest: PaginationRequest<PozoFilter>,
): DefinedUseQueryResult<PaginationResponse<PozoResponse>, Error> => {
	const response = useQuery({
		queryKey: [POZO_PAGINATED_SEARCH, paginationRequest],
		queryFn: async () => await PozoService.paginatedSearch(paginationRequest),
		retry: 0,
		refetchOnWindowFocus: false,
		initialData: {
			from: 0,
			to: 0,
			perPage: 0,
			currentPage: 0,
			lastPage: 0,
			total: 0,
			data: [],
		},
	});

	return response;
};

export default usePozoPaginatedSearch;
