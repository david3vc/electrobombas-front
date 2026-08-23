export default interface MantenimientoFilter {
    fecha: Date | null;
    idPozo: number | null;
    idTipoMantenimiento: number | null;
    observaciones: string | null;
    estado: boolean | null;
}