# React Router 7 – útvonalkezelés `createBrowserRouter` használatával

## A projekt célja

Készítsünk egy egyszerű React + TypeScript + Vite webáruházat, amelynek három fő menüpontja van: **Publikus felület**, **Admin** és **Kosár**. A feladat célja nem a webáruház működésének kidolgozása, hanem a **React Router** megismerése.

A projektben gyakoroljuk:

- `createBrowserRouter` és `RouterProvider` – az útvonalak meghatározása és használata;
- `NavLink` és `Link` – navigáció;
- `Outlet` – közös elrendezés és gyermekútvonalak;
- `useParams` – dinamikus útvonalparaméter;
- `useNavigate` – programból indított navigáció;
- `index` és `*` – kezdőoldal és ismeretlen útvonal.



## 1. Projekt létrehozása

Terminálban telepítsd a szokásos módon a projektet, ám telepíteni kell még hozzás a react-router csomagot is. Csak a csomag telepítése után indítsd el a projetktet. 

```bash
npm install react-router

```

**Fontos:** ez a leírás a React Router **7-es** verziójának `react-router` importjait használja. 


## 2. Könyvtárszerkezet

A `src` mappában hozzunk létre egy `pages` mappát:

```text
src/
├── pages/
│   ├── Layout.tsx
│   ├── PublicPage.tsx
│   ├── AdminPage.tsx
│   ├── CartPage.tsx
│   ├── ProductFormPage.tsx
│   ├── ProductDetailsPage.tsx
│   └── NoPage.tsx
├── App.tsx
├── App.css
└── main.tsx
```

A `main.tsx` maradhat a Vite által létrehozott állapotában. Az `App.tsx` tartalmazza majd a router konfigurációját.

Generáld le a létrehozott új komponensekben az alap function komponenseket!

Ezek az oldalak fognak az egyes menüpontokhoz tartozni. Az oldlak tartalmát a már megszokott módon komponensekből építjük majd fel. 

## 3. Az útvonalak megtervezése

| URL | Megjelenő oldal |
| --- | --- |
| `/` | Publikus felület |
| `/admin` | Admin felület |
| `/admin/uj-termek` | Termékfelviteli űrlap |
| `/kosar` | Kosár |
| `/termek/5` | Az 5-ös azonosítójú termék oldala |
| bármely ismeretlen URL | 404-es oldal |

A `/termek/:id` egy **dinamikus útvonal**: az `id` helyére különböző értékek kerülhetnek.

## 4. A router létrehozása – `App.tsx`

```tsx
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import PublicPage from "./pages/PublicPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NoPage from "./pages/NoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PublicPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "admin/uj-termek", element: <ProductFormPage /> },
      { path: "kosar", element: <CartPage /> },
      { path: "termek/:id", element: <ProductDetailsPage /> },
      { path: "*", element: <NoPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

**Mit jelentenek a beállítások?**

- `path`: az URL-hez tartozó útvonal.
- `element`: az adott útvonalon megjelenítendő komponens.
- `children`: a szülőútvonalon belüli gyermekútvonalak.
- `index: true`: a szülő alapértelmezett gyermekoldala, jelen esetben a `/`.
- `path: "*"`: minden olyan cím, amelyre nem illeszkedik más útvonal.

A `router` objektumot a komponensen **kívül** hozzuk létre, így nem épül újra minden rendereléskor.

## 5. Közös keret – `pages/Layout.tsx`

```tsx
import { NavLink, Outlet } from "react-router";

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

export default Layout;
```

A **`NavLink`** hasonlít a `Link` komponenshez, de automatikusan `active` osztályt kap, amikor aktív. Az `end` biztosítja, hogy a `/` menüpont ne legyen minden más útvonalon is aktív.

Az **`Outlet`** jelöli azt a helyet, ahová a router az aktuális gyermekoldalt behelyezi. Ha elhagyjuk, a fejléc látható marad, de az oldalak tartalma nem jelenik meg.

## 6. A három fő oldal

### `pages/PublicPage.tsx`

```tsx
import { Link } from "react-router";

function PublicPage() {
  return (
    <section>
      <h2>Publikus felület</h2>
      <p>Itt jelennek meg a termékek.</p>
      <Link to="/termek/5">5-ös termék megtekintése</Link>
    </section>
  );
}

export default PublicPage;
```

### `pages/AdminPage.tsx`

```tsx
import { Link } from "react-router";

function AdminPage() {
  return (
    <section>
      <h2>Admin felület</h2>
      <p>Itt kezelhetjük a termékeket.</p>
      <Link to="/admin/uj-termek">Új termék felvétele</Link>
    </section>
  );
}

export default AdminPage;
```

### `pages/CartPage.tsx`

```tsx
function CartPage() {
  return (
    <section>
      <h2>Kosár</h2>
      <p>A kosár jelenleg üres.</p>
    </section>
  );
}

export default CartPage;
```

**Ellenőrzés:** kattintsunk végig a három menüponton! A fejléc maradjon változatlan, csak a fő tartalom cserélődjön.

## 7. Dinamikus útvonal – `pages/ProductDetailsPage.tsx`

```tsx
import { useParams, Link } from "react-router";

function ProductDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h2>Termék részletei</h2>
      <p>A termék azonosítója: {id}</p>
      <Link to="/">Vissza a termékekhez</Link>
    </section>
  );
}

export default ProductDetailsPage;
```

A routerben a `termek/:id` útvonal szerepel. A `useParams()` segítségével kiolvashatjuk az URL-ben szereplő azonosítót.

Próbáljuk ki közvetlenül a böngésző címsorában:

- `/termek/5` → `5`
- `/termek/12` → `12`

**Figyelem:** az `id` típusa `string | undefined`, tehát nem automatikusan szám. A `:id` jelölés helyes; a `{id}` alak nem dinamikus útvonalparaméter.

## 8. Űrlap és programból indított navigáció – `pages/ProductFormPage.tsx`

Az űrlap egyelőre nem ment adatot. Beküldés után a `useNavigate()` segítségével visszalépünk az Admin oldalra.

```tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

function ProductFormPage() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(`A megadott termék: ${title}`);
    navigate("/admin");
  }

  return (
    <section>
      <h2>Új termék felvétele</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Termék neve:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Mentés</button>
      </form>
    </section>
  );
}

export default ProductFormPage;
```

A **`useNavigate()`** akkor hasznos, ha nem egy hivatkozásra kattintva, hanem valamilyen programlogika eredményeként szeretnénk oldalt váltani, például sikeres űrlapbeküldés után.

## 9. Nem létező oldal – `pages/NoPage.tsx`

```tsx
import { Link } from "react-router";

function NoPage() {
  return (
    <section>
      <h2>404 – Az oldal nem található</h2>
      <Link to="/">Vissza a kezdőlapra</Link>
    </section>
  );
}

export default NoPage;
```

Próbáljuk ki például a `/valami` útvonalat!

## Publikálás és github pages link létrehozása

### Telepítsd a gh-pages csomagot.

```
npm install -D gh-pages
```

### A vite.config.ts módosítása

Töltsd fel githubra a projektet, majd módosítsd a vite.config.js fájlt. 

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-router-webshop/",
});
```

### A React Router beállítása GitHub Pageshez

A createBrowserRouter() függvényben add meg a basename értékét:

```
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        // A korábbi útvonalak változatlanul maradnak
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
```
A basename biztosítja, hogy a router figyelembe vegye a /react-router-webshop/ előtagot. A meglévő Link és NavLink hivatkozásaidat nem kell átírni.

Van azonban még egy probléma: ha valaki közvetlenül megnyitja például a /react-router-webshop/admin címet, a GitHub Pages 404-es hibát adhat, mert nem tudja, hogy ezt az útvonalat a React kezeli.

Ennek megoldására egy egyszerű oktatási projektben a createHashRouter() is jó választás. Ekkor az URL például így néz ki:

https://FELHASZNALONEV.github.io/react-router-webshop/#/admin

Ehhez csak az importot és a router létrehozását kell megváltoztatnod az App.tsx-ben:


```
import { createHashRouter, RouterProvider } from "react-router";

const router = createHashRouter([
  // A korábbi útvonalak változatlanul maradnak
]);
```

## A package.json módosítása
A scripts részhez add hozzá a deploy parancsot:

```
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
