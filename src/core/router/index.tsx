import { createBrowserRouter, type RouteObject } from 'react-router-dom';

// import { PrivateOutlet } from "./CheckPageNavigation";
import AdminLayout from '../layouts/AdminLayout';
import Home from '../../views/Home/Home';
import MantenimientoMain from '../../views/Mantenimientos/MantenimientoMain';
import PozoMain from '../../views/Pozos/PozoMain';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <AdminLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'mantenimientos', element: <MantenimientoMain /> },
			{ path: 'pozos', element: <PozoMain /> },
		],
		// element: (
		// 	<PrivateOutlet>
		// 		<Admin />
		// 	</PrivateOutlet>
		// ),
		// children: [

		// 	{
		// 		path: '/planes-capacitacion',
		// 		element: <PlanMain />,
		// 	}
		// ],
	},
	// {
	// 	path: '/login',
	// 	element: (
	// 		<PublicOutlet>
	// 			<Auth />
	// 		</PublicOutlet>
	// 	),
	// 	children: [
	// 		{
	// 			index: true,
	// 			element: <Login />,
	// 		},
	// 	],
	// },
];

export default createBrowserRouter(routes);
