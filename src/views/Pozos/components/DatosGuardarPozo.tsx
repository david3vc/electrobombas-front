import { useEffect, useState, type JSX } from 'react';
import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import type { MantenimientoResponse, PozoRequest, TablaComunFilter } from '../../../types';
import { usePozoCreate, usePozoFindById, usePozoUpdate } from '../hooks';
import { LoadingForm } from '../../../core/components/loading';
import useTablaComunFindAllByIds from '../../../hooks/useTablaComunFindAllByIds';
import type { Option } from '../../../core/helpers/OptionsMapperHelper';
import ButtonCore from '../../../core/components/general/ButtonCore';
import NavLinkCore from '../../../core/components/general/NavLinkCore';
import BadgeCore from '../../../core/components/general/BadgeCore';
import { createColumnHelper } from '@tanstack/react-table';
import { TableCore } from '../../../core/components/table';
// import { toastSuccess } from '../../../core/helpers/ToastHelper';

interface DatosGuardarPozoProps {
    setIsLoadingSave?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoadingEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PozoFormik extends PozoRequest {
    ubicacion: Option | null;
}

const DatosGuardarPozo = ({
    setIsLoadingSave,
    setIsLoadingEdit,
}: DatosGuardarPozoProps): JSX.Element => {
    const params = useParams();
    const { id } = params;
    const [initialValues, setInitialValues] = useState<PozoFormik>({
        nombre: '',
        diametro: 0,
        ne: 0,
        profundidad: 0,
        cantidadTubos: 0,
        diametroTubo: 0,
        hp: 0,
        voltaje: 0,
        amperaje: 0,
        rpm: 0,
        caudalLps: 0,
        serieMotor: '',
        serieBomba: '',
        numeroImpulsores: 0,
        idUbicacion: 0,
        ubicacion: null
    });
    const formik = useFormik<PozoFormik>({
        enableReinitialize: true,
        initialValues,
        // validationSchema: Yup.object().shape({
        //     correo: Yup.string().trim().nullable().required('Correo es requerido'),
        //     clave: Yup.string().trim().nullable().required('Clave es requerido'),
        //     nombres: Yup.string().trim().nullable().required('Nombres es requerido'),
        //     apellidos: Yup.string().trim().nullable().required('Apellidos es requerido'),
        //     rol: Yup.object().nullable().required('Rol es requerido'),
        // }),
        onSubmit: values => {
            const payload: PozoRequest = {
                nombre: values.nombre,
                diametro: values.diametro == 0 ? null : values.diametro,
                ne: values.ne == 0 ? null : values.ne,
                profundidad: values.profundidad == 0 ? null : values.profundidad,
                cantidadTubos: values.cantidadTubos == 0 ? null : values.cantidadTubos,
                diametroTubo: values.diametroTubo == 0 ? null : values.diametroTubo,
                hp: values.hp == 0 ? null : values.hp,
                voltaje: values.voltaje == 0 ? null : values.voltaje,
                amperaje: values.amperaje == 0 ? null : values.amperaje,
                rpm: values.rpm == 0 ? null : values.rpm,
                caudalLps: values.caudalLps == 0 ? null : values.caudalLps,
                serieMotor: values.serieMotor,
                serieBomba: values.serieBomba,
                numeroImpulsores: values.numeroImpulsores == 0 ? null : values.numeroImpulsores,
                idUbicacion: values.ubicacion?.value ?? null,
            };
            void handleSave(payload);
        },
    });
    // const [searchFilterPaginated, setSearchFilterPaginated] = useState<PaginationRequest<PozoFilter>>({
    //     page: 1,
    //     perPage: 10,
    //     filter: {
    //         nombre: null,
    //         estado: null,
    //         cantidadTubos: null,
    //         caudalLps: null,
    //         diametro: null,
    //         diametroTubo: null,
    //         idUbicacion: null,
    //         ne: null,
    //         numeroImpulsores: null,
    //         profundidad: null,
    //     },
    // });

    const columnHelper = createColumnHelper<MantenimientoResponse>();

    const columns = [
        columnHelper.display({
            id: 'acciones',
            header: () => <span className="d-block text-center text-nowrap">Acciones</span>,
            cell: ({ row }) => (
                <span className="d-flex align-items-center justify-content-center">
                    <ButtonCore
                        variant={row.original.estado ? 'outline-danger' : 'outline-warning'}
                        title={row.original.estado ? 'Eliminar' : 'Restaurar'}
                        size="sm"
                        icon={row.original.estado ? 'fa-solid fa-trash' : 'fa-solid fa-rotate-left'}
                        className="border-0"
                    // onClick={() => {
                    // 	void removeDepartamento(row.original);
                    // }}
                    />
                    {' '}
                    <NavLinkCore
                        variant="outline-primary"
                        to={`editar/${row.original.id}`}
                        title="Editar"
                        icon="fa-solid fa-pen-to-square"
                        className="border-0"
                        size="sm"
                    />
                    <ButtonCore
                        variant="outline-info"
                        title="Detalle"
                        size="sm"
                        icon="fa-solid fa-eye"
                        className="border-0"
                    // onClick={() => modalRef.current?.openModal(row.original.id)}
                    />
                </span>
            ),
        }),
        columnHelper.accessor('fecha', {
            header: 'Fecha',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('idTipoMantenimiento', {
            header: 'Tipo de mantenimiento',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('observaciones', {
            header: 'Observaciones',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('recordState', {
            header: 'Estado',
            cell: ({ row }) => (
                <BadgeCore variant={row?.original.recordState.color} pill={true}>
                    {row?.original.recordState.label}
                </BadgeCore>
            ),
        }),
    ];

    // Hooks
    const [searchFilterTipoFacilitador] =
        useState<TablaComunFilter>({
            idTabla: 1,
            idFila: null,
            codigo: null
        });
    const { mutateAsync: pozoCreateAsync, isPending: isPendingCreate } = usePozoCreate();
    const { mutateAsync: pozoEditAsync, isPending: isPendingEdit } = usePozoUpdate();
    const {
        data: dataPozo,
        isSuccess: isSuccessPozoData,
        isFetching: isFetchingPozo,
    } = usePozoFindById(Number(id ?? 0));
    const { data: ubicacionData } = useTablaComunFindAllByIds(searchFilterTipoFacilitador);
    const ubicacionSimple = ubicacionData?.map(item => ({
        value: item.id,
        label: item.descripcion ?? '',
    }))
    // const { data: dataPozoPaginated, isFetching: isFetchingPozoPaginated } = usePozoPaginatedSearch(searchFilterPaginated);

    useEffect(() => {
        if (isSuccessPozoData) {
            const tipoFacilitadorResponse: Option = {
                value: dataPozo.ubicacion?.id ?? 0,
                label: dataPozo.ubicacion?.descripcion ?? ''
            }
            setInitialValues(prev => {
                return {
                    ...prev,
                    nombre: dataPozo.nombre ?? '',
                    diametro: dataPozo.diametro ?? 0,
                    ne: dataPozo.ne ?? 0,
                    profundidad: dataPozo.profundidad ?? 0,
                    cantidadTubos: dataPozo.cantidadTubos ?? 0,
                    diametroTubo: dataPozo.diametroTubo ?? 0,
                    hp: dataPozo.hp ?? 0,
                    voltaje: dataPozo.voltaje ?? 0,
                    amperaje: dataPozo.amperaje ?? 0,
                    rpm: dataPozo.rpm ?? 0,
                    caudalLps: dataPozo.caudalLps ?? 0,
                    serieMotor: dataPozo.serieMotor ?? '',
                    serieBomba: dataPozo.serieBomba ?? '',
                    numeroImpulsores: dataPozo.numeroImpulsores ?? 0,
                    idUbicacion: dataPozo.idUbicacion ?? 0,
                    ubicacion: dataPozo.ubicacion !== null ? tipoFacilitadorResponse : null
                };
            });
        }
    }, [isSuccessPozoData]);

    useEffect(() => {
        setIsLoadingSave?.(isPendingCreate);
    }, [isPendingCreate]);

    useEffect(() => {
        setIsLoadingEdit?.(isPendingEdit);
    }, [isPendingEdit]);

    // Methods
    const handleSave = async (payload: PozoRequest): Promise<void> => {
        if (isSuccessPozoData) {
            await pozoEditAsync({ id: Number(id), pozo: payload });
        } else await pozoCreateAsync(payload);
    };

    // const goToPage = (payload: FilterPage): void => {
    //     console.log('payload', payload);
    //     setSearchFilterPaginated({
    //         ...searchFilterPaginated,
    //         page: payload.page,
    //         perPage: payload.perPage,
    //     });
    // };

    return (
        <>
            <Row>
                <Col md={12}>
                    <Form onSubmit={formik.handleSubmit} id="formGuardarPozo">
                        <Row>
                            <Col md={6}>
                                <Card className="mt-2 mb-2">
                                    <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                                        <span>Información general</span>
                                    </Card.Header>
                                    <Card.Body>
                                        {
                                            isFetchingPozo ? (
                                                <LoadingForm />
                                            ) : (
                                                <Row className="g-3">
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Nombre</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            size="lg"
                                                            name="nombre"
                                                            value={formik.values?.nombre ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Diámetro</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="diametro"
                                                            value={formik.values?.diametro ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Nivel estático</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="ne"
                                                            value={formik.values?.ne ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Profundidad</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="profundidad"
                                                            value={formik.values?.profundidad ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Tubos</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="cantidadTubos"
                                                            value={formik.values?.cantidadTubos ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Diámetro del tubo</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="diametroTubo"
                                                            value={formik.values?.diametroTubo ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>

                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Ubicación</Form.Label>
                                                        <Select
                                                            className="react__select"
                                                            classNamePrefix="rs_react"
                                                            name="ubicacion"
                                                            value={formik.values.ubicacion ?? ''}
                                                            options={ubicacionSimple}
                                                            onChange={(option, target) => {
                                                                void formik.setFieldValue(target?.name ?? '', option);
                                                            }}
                                                            placeholder="Buscar"
                                                            menuPlacement="auto"
                                                            isClearable
                                                        />
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="mt-2 mb-2">
                                    <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                                        <span>Especificaciones técnicas</span>
                                    </Card.Header>
                                    <Card.Body>
                                        {
                                            isFetchingPozo ? (
                                                <LoadingForm />
                                            ) : (
                                                <Row className="g-3">
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>hp</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="hp"
                                                            value={formik.values?.hp ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Voltaje</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="voltaje"
                                                            value={formik.values?.voltaje ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Amperaje</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="amperaje"
                                                            value={formik.values?.amperaje ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Rpm</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="rpm"
                                                            value={formik.values?.rpm ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Caudal</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="caudalLps"
                                                            value={formik.values?.caudalLps ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Serie del motor</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            size="lg"
                                                            name="serieMotor"
                                                            value={formik.values?.serieMotor ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Serie de la bomba</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            size="lg"
                                                            name="serieBomba"
                                                            value={formik.values?.serieBomba ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} md={6} xxl={6}>
                                                        <Form.Label>Número de impulsores</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            size="lg"
                                                            name="numeroImpulsores"
                                                            value={formik.values?.numeroImpulsores ?? ''}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                            {
                                isSuccessPozoData ? (
                                    <Col md={12}>
                                        <Card className="mt-2 mb-2">
                                            <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                                                <span>Historial de mantenimientos</span>
                                            </Card.Header>
                                            <Card.Body>
                                                {
                                                    isFetchingPozo ? (
                                                        <LoadingForm />
                                                    ) : (
                                                        <Row className="g-3">
                                                            <TableCore<MantenimientoResponse>
                                                                columns={columns}
                                                                data={dataPozo.mantenimientos}
                                                            />
                                                        </Row>
                                                    )
                                                }
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                ) : null
                            }
                        </Row>
                    </Form>
                </Col>
                <Col md={12}>
                </Col>
            </Row>
        </>
    )
}

export default DatosGuardarPozo;