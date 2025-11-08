import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BillboardV2 from "./components/BillboardV2";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import MovieDetails, { MovieDetailsLoader } from "./components/MovieDetails";
import { Complexes } from "./components/Complexes";
import PageForIndex from "./components/PageForIndex";
import LoginV5 from "./components/LoginV5";
import NoPermit from "./components/NoPermit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<PageForIndex />}></Route>
      <Route
        path="/Movie/:id"
        element={<MovieDetails />}
        loader={MovieDetailsLoader}
      ></Route>
      <Route path="/NoPermit" element={<NoPermit/>}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App container">
      <Header />

      <LoginV5></LoginV5>

      {/* <Complexes></Complexes> */}

      <RouterProvider router={router} />

      <Footer />

      {/* original code */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
