import { stringify } from "qs";
import type { TablaComunFilter, TablaComunResponse } from "../../types";
import axios, { type AxiosResponse } from "axios";
import { API_BASE_URL } from "../../core/constants/env";

export const findAllByIds = async (
	filter: TablaComunFilter,
): Promise<TablaComunResponse[]> => {
	const paramsString: string = stringify(filter, { allowDots: true });

	const response: AxiosResponse<TablaComunResponse[]> = await axios.get(
		`${API_BASE_URL}/api/tablacomun/find-all-by-ids?${paramsString}`,
	);

	return response.data;
};