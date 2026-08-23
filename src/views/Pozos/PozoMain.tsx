import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import BreadcrumbCore from "../../core/components/general/BreadcrumbCore";
import ButtonCore from "../../core/components/general/ButtonCore";
import IconCore from "../../core/components/general/IconCore";
import { AccordionCore } from '../../core/components/accordion';
import { LoadingTable } from '../../core/components/loading';
import { TableCorePaginated } from '../../core/components/table';
import type { FilterPage, PaginationRequest, PozoFilter, PozoResponse, RecordState } from '../../types';
import { useState } from 'react';
import { useFormik } from 'formik';
import { createColumnHelper } from '@tanstack/react-table';
import BadgeCore from '../../core/components/general/BadgeCore';
import { usePozoPaginatedSearch } from './hooks';

interface DepartamentoFilterFormik extends PozoFilter {
    recordState: RecordState | null;
}

const PozoMain = () => {
    // Attributes
    const [searchFilter, setSearchFilter] = useState<PaginationRequest<PozoFilter>>({
        page: 1,
        perPage: 10,
        filter: {
            nombre: null,
            estado: null,
            cantidadTubos: null,
            caudalLps: null,
            diametro: null,
            diametroTubo: null,
            idUbicacion: null,
            ne: null,
            numeroImpulsores: null,
            profundidad: null,
        },
    });

    const formik = useFormik<DepartamentoFilterFormik>({
        initialValues: {
            nombre: null,
            estado: null,
            cantidadTubos: null,
            caudalLps: null,
            diametro: null,
            diametroTubo: null,
            idUbicacion: null,
            ne: null,
            numeroImpulsores: null,
            profundidad: null,
            recordState: null,
        },
        onSubmit: values => {
            setSearchFilter(prev => {
                return {
                    ...prev,
                    page: 1,
                    filter: {
                        nombre: values.nombre,
                        estado: values.estado,
                        cantidadTubos: values.cantidadTubos,
                        caudalLps: values.caudalLps,
                        diametro: values.diametro,
                        diametroTubo: values.diametroTubo,
                        idUbicacion: values.idUbicacion,
                        ne: values.ne,
                        numeroImpulsores: values.numeroImpulsores,
                        profundidad: values.profundidad,
                    },
                };
            });
        },
    });

    const columnHelper = createColumnHelper<PozoResponse>();

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
                    <ButtonCore
                        variant="outline-primary"
                        title="Editar"
                        size="sm"
                        icon="fa-solid fa-pen-to-square"
                        className="border-0"
                    // onClick={() => modalRef.current?.openModal(row.original.id)}
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
        columnHelper.accessor('nombre', {
            header: 'Nombre',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('diametro', {
            header: 'Diametro',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('ne', {
            header: 'N.E.',
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
    const { data: pozoData, isFetching: isFetchingPozo } =
        usePozoPaginatedSearch(searchFilter);

    // Methods
    const goToPage = (payload: FilterPage): void => {
        console.log('payload', payload);
        setSearchFilter({
            ...searchFilter,
            page: payload.page,
            perPage: payload.perPage,
        });
    };

    return (
        <>
            <BreadcrumbCore>
                <BreadcrumbCore.Items className="py-3">
                    <BreadcrumbCore.Item href="/">
                        <IconCore icon="fa-solid fa-house" className="text-dark" />
                    </BreadcrumbCore.Item>
                    <BreadcrumbCore.Item>Pozos</BreadcrumbCore.Item>
                </BreadcrumbCore.Items>
                <BreadcrumbCore.Actions>
                    <ButtonCore
                        variant="primary"
                        text="Nuevo pozo"
                        title="Nuevo pozo"
                        size="sm"
                        icon="fa-solid fa-circle-plus"
                        className="ms-2"
                        hiddenText="sm"
                    // onClick={() => modalRef.current?.openModal()}
                    />
                </BreadcrumbCore.Actions>
            </BreadcrumbCore>

            <Row>
                <Col>
                    <AccordionCore className="accordion-spacing" defaultActiveKey={'busquedaBasica'}>
                        <AccordionCore.Item eventKey="busquedaBasica">
                            <AccordionCore.Header title="Búsqueda" className="py-1 fs-3 fw-bold">
                                <div className="d-flex justify-content-end">
                                    <div>
                                        <ButtonCore
                                            variant="outline-dark"
                                            size="sm"
                                            text="Limpiar"
                                            icon="fa-solid fa-arrows-rotate"
                                            hiddenText="sm"
                                            onClick={formik.handleReset}
                                        />{' '}
                                        <ButtonCore
                                            variant="primary"
                                            size="sm"
                                            text="Buscar"
                                            icon="fa-solid fa-magnifying-glass"
                                            hiddenText="sm"
                                            onClick={() => {
                                                formik.handleSubmit();
                                            }}
                                        />
                                    </div>
                                </div>
                            </AccordionCore.Header>
                            <AccordionCore.Body>
                                <Row className="g-3">
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                            value={formik.values?.nombre ?? ''}
                                            onChange={formik.handleChange}
                                            onKeyUp={e => {
                                                if (e.key === 'Enter') formik.handleSubmit();
                                            }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Diámetro</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                        // value={formik.values?.nombre ?? ''}
                                        // onChange={formik.handleChange}
                                        // onKeyUp={e => {
                                        // 	if (e.key === 'Enter') formik.handleSubmit();
                                        // }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Nivel estático</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                        // value={formik.values?.nombre ?? ''}
                                        // onChange={formik.handleChange}
                                        // onKeyUp={e => {
                                        // 	if (e.key === 'Enter') formik.handleSubmit();
                                        // }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Profundidad</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                        // value={formik.values?.nombre ?? ''}
                                        // onChange={formik.handleChange}
                                        // onKeyUp={e => {
                                        // 	if (e.key === 'Enter') formik.handleSubmit();
                                        // }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Cantidad tubos</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                        // value={formik.values?.nombre ?? ''}
                                        // onChange={formik.handleChange}
                                        // onKeyUp={e => {
                                        // 	if (e.key === 'Enter') formik.handleSubmit();
                                        // }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Diámetro tubo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                        // value={formik.values?.nombre ?? ''}
                                        // onChange={formik.handleChange}
                                        // onKeyUp={e => {
                                        // 	if (e.key === 'Enter') formik.handleSubmit();
                                        // }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Caudal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            size="lg"
                                            name="nombre"
                                        // value={formik.values?.nombre ?? ''}
                                        // onChange={formik.handleChange}
                                        // onKeyUp={e => {
                                        // 	if (e.key === 'Enter') formik.handleSubmit();
                                        // }}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Ubicación</Form.Label>
                                        <Select
                                            className="react__select"
                                            classNamePrefix="rs_react"
                                            name="division"
                                            // value={formik.values.division?? ''}
                                            // options={divisionOptions}
                                            // onChange={(option, target) => {
                                            // 	void formik.setFieldValue(target?.name ?? '', option);
                                            // 	formik.handleSubmit();
                                            // }}
                                            placeholder="Buscar"
                                            menuPlacement="auto"
                                            isClearable
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={4} xxl={3}>
                                        <Form.Label>Estado</Form.Label>
                                        <Select
                                            className="react__select"
                                            classNamePrefix="rs_react"
                                            name="recordState"
                                            // value={formik.values?.recordState}
                                            // options={RECORD_STATUS}
                                            // onChange={(option, target) => {
                                            // 	void formik.setFieldValue(target?.name ?? '', option);
                                            // 	formik.handleSubmit();
                                            // }}
                                            placeholder="Buscar"
                                            menuPlacement="auto"
                                            isSearchable={false}
                                            isClearable
                                        />
                                    </Col>
                                </Row>
                            </AccordionCore.Body>
                        </AccordionCore.Item>
                    </AccordionCore>

                    <Card className="mt-4 mb-2">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
                            <span>Listado de pozos</span>
                        </Card.Header>
                        <Card.Body>
                            {isFetchingPozo ? (
                                <LoadingTable />
                            ) : (
                                <TableCorePaginated<PozoResponse>
                                    columns={columns}
                                    data={pozoData}
                                    goToPage={goToPage}
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PozoMain;