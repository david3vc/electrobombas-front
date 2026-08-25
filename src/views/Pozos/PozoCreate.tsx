import { type JSX } from 'react';
import BreadcrumbGuardarPozo from './components/BreadcrumbGuardarPozo';
import DatosGuardarPozo from './components/DatosGuardarPozo';

const PozoCreate = (): JSX.Element => {
	return (
		<>
			<BreadcrumbGuardarPozo titulo="Registrar" />
			<DatosGuardarPozo />
		</>
	);
};

export default PozoCreate;
