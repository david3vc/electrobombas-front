import { type SizeProp, type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { JSX } from 'react/jsx-runtime';

interface BaseProps {
	icon: string | null | undefined;
	className?: string;
	title?: string;
	size?: string;
}

// Icono por defecto cuando el menú/registro no tiene icono definido en BD
// (evita el error de consola "Could not find icon null" de FontAwesome).
const FALLBACK_ICON = 'fa-solid fa-circle-dot';

const IconCore = ({ icon, className, title, size }: BaseProps): JSX.Element => {
	const safeIcon = icon != null && icon.trim() !== '' ? icon : FALLBACK_ICON;
	return (
		<FontAwesomeIcon
			icon={safeIcon as IconProp}
			className={className}
			title={title}
			size={size as SizeProp}
		/>
	);
};

export default IconCore;
