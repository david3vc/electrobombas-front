export default interface PozoRequest {
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
}