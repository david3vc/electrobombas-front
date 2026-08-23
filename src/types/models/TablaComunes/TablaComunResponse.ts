export default interface TablaComunResponse {
	id: number;
    idTabla: number;
    idFila: number;
    codigo: string | null;
	descripcion: string | null;
	createdAt: Date;
	updatedAt: Date | null;
	state: boolean;
}
