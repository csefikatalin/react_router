import React from 'react'
import { Link } from 'react-router';

function AdminPage() {

  return (
    <section>
      <h2>Admin felület</h2>
      <p>Itt kezelhetjük a termékeket.</p>
      <Link to="/admin/uj-termek">Új termék felvétele</Link>
    </section>
  );
}


export default AdminPage