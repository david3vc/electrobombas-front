import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import type { PozoResponse, PozoRequest } from '../../../types';
import { POZO_PAGINATED_SEARCH } from './QueryKeys';
import { PozoService } from '../../../services';

const usePozoCreate = (): UseMutationResult<
	PozoResponse,
	Error,
	PozoRequest
> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (pozo: PozoRequest) =>
			await PozoService.create(pozo),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [POZO_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default usePozoCreate;
