import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { PozoFilter, PozoRequest, PozoResponse, PaginationRequest, PaginationResponse } from '../../types';
import { stringify } from 'qs';
import { getRecordState } from '../../core/helpers/RecordStateHelper';

export const findAll = async (): Promise<PozoResponse[]> => {
	const response: AxiosResponse<PozoResponse[]> = await axios.get(
		`${API_BASE_URL}/api/pozo`,
	);

	return response.data;
};

export const findById = async (id: number): Promise<PozoResponse> => {
	const response: AxiosResponse<PozoResponse> = await axios.get(
		`${API_BASE_URL}/api/pozo/${id}`,
	);

	return response.data;
};

export const create = async (pozo: PozoRequest): Promise<PozoResponse> => {
	const response: AxiosResponse<PozoResponse> = await axios.post(
		`${API_BASE_URL}/api/pozo`,
		pozo,
	);

	return response.data;
};

export const update = async (
	id: number,
	pozo: PozoRequest,
): Promise<PozoResponse> => {
	const response: AxiosResponse<PozoResponse> = await axios.put(
		`${API_BASE_URL}/api/pozo/${id}`,
		pozo,
	);

	return response.data;
};

export const deleteById = async (id: number): Promise<PozoResponse> => {
	const response: AxiosResponse<PozoResponse> = await axios.delete(
		`${API_BASE_URL}/api/pozo/${id}`,
	);

	return response.data;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<PozoFilter>,
): Promise<PaginationResponse<PozoResponse>> => {
	const paramsString: string = stringify(paginationRequest, { allowDots: true });

	const response: AxiosResponse<PaginationResponse<PozoResponse>> = await axios.get(
		`${API_BASE_URL}/api/pozo/paginated-search?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<PozoResponse> = response.data;

	const pozos: PozoResponse[] = paginationResponse.data.map(item => {
		const pozo: PozoResponse = {
			...item,
			recordState: getRecordState(item.estado),
		};

		return pozo;
	});

	const paginationProfesion: PaginationResponse<PozoResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: pozos,
	};

	return paginationProfesion;
};