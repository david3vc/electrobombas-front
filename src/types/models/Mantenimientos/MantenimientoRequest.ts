export default interface MantenimientoRequest {
    fecha: Date | null;
    idPozo: number | null;
    idTipoMantenimiento: number | null;
    observaciones: string | null;
}