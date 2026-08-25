import { type JSX } from 'react';
import BreadcrumbGuardarPozo from './components/BreadcrumbGuardarPozo';
import DatosGuardarPozo from './components/DatosGuardarPozo';

const PozoEdit = (): JSX.Element => {
	return (
		<>
			<BreadcrumbGuardarPozo titulo="Editar" />
			<DatosGuardarPozo />
		</>
	);
};

export default PozoEdit;
