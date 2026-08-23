import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { MantenimientoFilter, MantenimientoRequest, MantenimientoResponse, PaginationRequest, PaginationResponse } from '../../types';
import { stringify } from 'qs';
import { getRecordState } from '../../core/helpers/RecordStateHelper';

export const findAll = async (): Promise<MantenimientoResponse[]> => {
	const response: AxiosResponse<MantenimientoResponse[]> = await axios.get(
		`${API_BASE_URL}/api/mantenimiento`,
	);

	return response.data;
};

export const findById = async (id: number): Promise<MantenimientoResponse> => {
	const response: AxiosResponse<MantenimientoResponse> = await axios.get(
		`${API_BASE_URL}/api/mantenimiento/${id}`,
	);

	return response.data;
};

export const create = async (mantenimiento: MantenimientoRequest): Promise<MantenimientoResponse> => {
	const response: AxiosResponse<MantenimientoResponse> = await axios.post(
		`${API_BASE_URL}/api/mantenimiento`,
		mantenimiento,
	);

	return response.data;
};

export const update = async (
	id: number,
	mantenimiento: MantenimientoRequest,
): Promise<MantenimientoResponse> => {
	const response: AxiosResponse<MantenimientoResponse> = await axios.put(
		`${API_BASE_URL}/api/mantenimiento/${id}`,
		mantenimiento,
	);

	return response.data;
};

export const deleteById = async (id: number): Promise<MantenimientoResponse> => {
	const response: AxiosResponse<MantenimientoResponse> = await axios.delete(
		`${API_BASE_URL}/api/mantenimiento/${id}`,
	);

	return response.data;
};

export const paginatedSearch = async (
	paginationRequest: PaginationRequest<MantenimientoFilter>,
): Promise<PaginationResponse<MantenimientoResponse>> => {
	const paramsString: string = stringify(paginationRequest, { allowDots: true });

	const response: AxiosResponse<PaginationResponse<MantenimientoResponse>> = await axios.get(
		`${API_BASE_URL}/api/mantenimiento/paginated-search?${paramsString}`,
	);

	const paginationResponse: PaginationResponse<MantenimientoResponse> = response.data;

	const mantenimientos: MantenimientoResponse[] = paginationResponse.data.map(item => {
		const mantenimiento: MantenimientoResponse = {
			...item,
			recordState: getRecordState(item.estado),
		};

		return mantenimiento;
	});

	const paginationProfesion: PaginationResponse<MantenimientoResponse> = {
		from: paginationResponse.from,
		to: paginationResponse.to,
		perPage: paginationResponse.perPage,
		currentPage: paginationResponse.currentPage,
		lastPage: paginationResponse.lastPage,
		total: paginationResponse.total,
		data: mantenimientos,
	};

	return paginationProfesion;
};