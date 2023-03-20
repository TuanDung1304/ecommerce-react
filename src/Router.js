import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {routes.map(({ component, path, layout: Layout }, index) => (
        <Route
          key={index}
          path={path}
          element={Layout ? <Layout>{component}</Layout> : component}
        />
      ))}
    </>
  )
);

function DefineRoute() {
  return <RouterProvider router={router} />;
}

export default DefineRoute;
