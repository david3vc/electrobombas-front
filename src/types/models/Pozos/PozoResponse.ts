import type MantenimientoResponse from "../Mantenimientos/MantenimientoResponse";
import type RecordState from "../Paginations/RecordState";
import type TablaComunResponse from "../TablaComunes/TablaComunResponse";

export default interface PozoResponse {
    id: number;
    nombre: string | null;
    diametro: number | null;
    ne: number | null;
    profundidad: number | null;
    cantidadTubos: number | null;
    diametroTubo: number | null;
    hp: number | null;
    voltaje: number | null;
    amperaje: number | null;
    rpm: number | null;
    caudalLps: number | null;
    serieMotor: string | null;
    serieBomba: string | null;
    numeroImpulsores: number | null;
    idUbicacion: number | null;
    estado: boolean;
    ubicacion: TablaComunResponse;
    mantenimientos: MantenimientoResponse[];
    recordState: RecordState;
}