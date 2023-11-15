import { Outlet } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import MobileMenu from './MobileMenu';
import Loading from './Loading';

function RootLayout() {
  return (
    <>
      <Loading />
      <header>
        <img src="/src/assests/logo.svg" alt="logo" />
        <h2>Forum App</h2>
      </header>
      <main className="main">
        <LeftSideBar />
        <section className="main-container">
          <Outlet />
        </section>
      </main>
      <MobileMenu />
    </>
  );
}

export default RootLayout;
