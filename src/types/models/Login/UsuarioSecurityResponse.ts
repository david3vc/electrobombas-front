import type SecurityResponse from "./SecurityResponse";

export default interface UsuarioSecurityResponse {
	id: number;
	nombres: string;
	apellidos: string;
	correo: string;
	clave: string;
	idRol: number;
	createdAt: Date;
	updatedAt: Date;
	state: boolean;
	security: SecurityResponse;
}
