import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import { type PozoResponse } from '../../../types';
import { POZO_PAGINATED_SEARCH } from './QueryKeys';
import { PozoService } from '../../../services';

const usePozoDeleteById = (): UseMutationResult<PozoResponse, Error, number> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (id: number) => await PozoService.deleteById(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [POZO_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default usePozoDeleteById;
