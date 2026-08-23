import type RecordState from "../Paginations/RecordState";

export default interface MantenimientoTrabajadorResponse {
    id: number;
    idTrabajador: number | null;
    idMantenimiento: number | null;
    estado: boolean;
    recordState: RecordState;
}