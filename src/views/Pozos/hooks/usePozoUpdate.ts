import { type UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query';
import type { PozoRequest, PozoResponse } from '../../../types';
import { POZO_PAGINATED_SEARCH } from './QueryKeys';
import { PozoService } from '../../../services';

interface PozoUpdateProps {
	id: number;
	pozo: PozoRequest;
}

const usePozoUpdate = (): UseMutationResult<
	PozoResponse,
	Error,
	PozoUpdateProps
> => {
	const queryClient = useQueryClient();
	const response = useMutation({
		mutationFn: async (payload: PozoUpdateProps) =>
			await PozoService.update(payload.id, payload.pozo),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [POZO_PAGINATED_SEARCH] });
		},
	});

	return response;
};

export default usePozoUpdate;
