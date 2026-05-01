// index.tsx — logged-out home page.
// All sections live inside home.tsx; this file just renders that component
// with the logged-out navbar.

import Home from "./home";

const Main = () => <Home loggedIn={false} />;

export default Main;