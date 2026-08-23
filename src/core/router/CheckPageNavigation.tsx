import { type ReactElement, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { LocalStorageSession } from '../sessions';

interface BaseProps {
	children: ReactElement;
}

export const PrivateOutlet = ({ children }: BaseProps): JSX.Element => {
	const isAuth = LocalStorageSession.isValidAuthorization();

	if (!isAuth) return <Navigate to="/login" replace />;

	// const ruta = window.location.pathname;

	// useEffect(()=>{
	// // 	if(ruta === "/") window.location.reload();
	// 	window.location.reload();
	// },[])

	return children;
};

export const PublicOutlet = ({ children }: BaseProps): JSX.Element => {
	const isAuth = LocalStorageSession.isValidAuthorization();

	if (isAuth) return <Navigate to="/" replace />;

	return children;
};
