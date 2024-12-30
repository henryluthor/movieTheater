import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Billboard from "./components/Billboard";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import MovieDetails, { MovieDetailsLoader } from "./components/MovieDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Billboard/>}></Route>
      <Route path="/Movie/:id" element={<MovieDetails/>} loader={MovieDetailsLoader}></Route>
      <Route path="*" element={<PageNotFound/>}></Route>
    </Route>
  )
)

function App() {
  return (
    
    <div className="App">

      <Header />

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
