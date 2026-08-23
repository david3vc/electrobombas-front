import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../core/constants/env';
import type { MantenimientoTrabajadorRequest, MantenimientoTrabajadorResponse  } from '../../types';

export const findAll = async (): Promise<MantenimientoTrabajadorResponse[]> => {
	const response: AxiosResponse<MantenimientoTrabajadorResponse[]> = await axios.get(
		`${API_BASE_URL}/api/mantenimientotrabajador`,
	);

	return response.data;
};

export const findById = async (id: number): Promise<MantenimientoTrabajadorResponse> => {
	const response: AxiosResponse<MantenimientoTrabajadorResponse> = await axios.get(
		`${API_BASE_URL}/api/mantenimientotrabajador/${id}`,
	);

	return response.data;
};

export const create = async (mantenimientoTrabajador: MantenimientoTrabajadorRequest): Promise<MantenimientoTrabajadorResponse> => {
	const response: AxiosResponse<MantenimientoTrabajadorResponse> = await axios.post(
		`${API_BASE_URL}/api/mantenimientotrabajador`,
		mantenimientoTrabajador,
	);

	return response.data;
};

export const update = async (
	id: number,
	mantenimientoTrabajador: MantenimientoTrabajadorRequest,
): Promise<MantenimientoTrabajadorResponse> => {
	const response: AxiosResponse<MantenimientoTrabajadorResponse> = await axios.put(
		`${API_BASE_URL}/api/mantenimientotrabajador/${id}`,
		mantenimientoTrabajador,
	);

	return response.data;
};

export const deleteById = async (id: number): Promise<MantenimientoTrabajadorResponse> => {
	const response: AxiosResponse<MantenimientoTrabajadorResponse> = await axios.delete(
		`${API_BASE_URL}/api/mantenimientotrabajador/${id}`,
	);

	return response.data;
};