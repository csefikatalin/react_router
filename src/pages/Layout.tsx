import React from 'react'
import { NavLink, Outlet } from 'react-router';

function Layout() {
  return (
    <>
      <header>
        <h1>Webáruház</h1>
        <nav>
          <NavLink to="/" end>Publikus felület</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/kosar">Kosár</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout