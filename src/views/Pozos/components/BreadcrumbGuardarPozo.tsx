import { type JSX } from 'react';
import Button from 'react-bootstrap/Button';
import BreadcrumbCore from '../../../core/components/general/BreadcrumbCore';
import IconCore from '../../../core/components/general/IconCore';
import NavLinkCore from '../../../core/components/general/NavLinkCore';

interface BreadcrumbGuardarPozoProps {
	titulo: string;
}

const BreadcrumbGuardarPozo = ({ titulo }: BreadcrumbGuardarPozoProps): JSX.Element => {
	// const rol = LocalStorageSession.getRol();
	return (
		<BreadcrumbCore>
			<BreadcrumbCore.Items className="py-3">
				<BreadcrumbCore.Item href="/">
					<IconCore icon="fa-solid fa-house" className="text-dark" />
				</BreadcrumbCore.Item>
				<BreadcrumbCore.Item active>Pozos</BreadcrumbCore.Item>
				<BreadcrumbCore.Item active>{titulo}</BreadcrumbCore.Item>
			</BreadcrumbCore.Items>
			<BreadcrumbCore.Actions>
				<Button type="submit" variant="primary" size="sm" form="formGuardarPozo">
					Guardar
				</Button>
				<IconCore icon="fa-solid fa-grip-lines-vertical" className="mx-3" />
				<NavLinkCore
					to="/pozos"
					variant=""
					size="sm"
					className="btn btn-sm btn-dark"
					icon="fa-solid fa-arrow-left"
				/>
			</BreadcrumbCore.Actions>
		</BreadcrumbCore>
	);
};

export default BreadcrumbGuardarPozo;
