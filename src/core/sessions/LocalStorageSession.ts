import type { UsuarioSecurityResponse } from "../../types";

const STORAGE_OF_AUTHORIZATION = 'STORAGE_OF_AUTHORIZATION_APP';

export const isValidAuthorization = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTHORIZATION);

	if (data == null) return false;

	const user: UsuarioSecurityResponse = JSON.parse(data);

	if (user.security?.expireOn.length === 0) return false;

	const expireOn = new Date(user.security.expireOn);
	const currentDate = new Date();

	return expireOn > currentDate;
};