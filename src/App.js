import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BillboardV2 from "./components/BillboardV2";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import MovieDetails, { MovieDetailsLoader } from "./components/MovieDetails";
import Login from "./components/Login";
import Complexes from "./components/Complexes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<BillboardV2/>}></Route>
      <Route path="/Movie/:id" element={<MovieDetails/>} loader={MovieDetailsLoader}></Route>
      <Route path="*" element={<PageNotFound/>}></Route>
    </Route>
  )
)

function App() {
  return (
    
    <div className="App">

      <Header />

      <Login></Login>

      <Complexes></Complexes>

      <RouterProvider router={router}/>

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
