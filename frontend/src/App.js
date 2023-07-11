import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { CheckpointPage } from './pages/CheckpointPage';
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/pointview',
    element: <CheckpointPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;