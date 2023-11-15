import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import DetailPage from './pages/DetailPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import NewThread from './pages/NewThread';

function App() {
  const isPreload = useSelector((states) => states.isPreload);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser) {
    const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/newthread" element={<NewThread />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Route>,
    ));

    return (
      <div className="app-container">
        <RouterProvider router={router} />
      </div>
    );
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/threads/:id" element={<DetailPage />} />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />
    </Route>,
  ));

  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
