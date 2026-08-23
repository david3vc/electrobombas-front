import type RecordState from "../Paginations/RecordState";

export default interface MantenimientoResponse {
    id: number;
    fecha: Date | null;
    idPozo: number | null;
    idTipoMantenimiento: number | null;
    observaciones: string | null;
    estado: boolean;
    recordState: RecordState;
}