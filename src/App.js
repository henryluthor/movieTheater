import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BillboardV2 from "./components/BillboardV2";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import MovieDetails, { MovieDetailsLoader } from "./components/MovieDetails";
import { Complexes } from "./components/Complexes";
import PageForIndex from "./components/PageForIndex";
import LoginV6 from "./components/LoginV6";
import Home from "./components/Home"
import MyProfile from "./components/MyProfile";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import UserForm from "./components/UserForm";


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route index element={<PageForIndex />}></Route>
//       <Route
//         path="/Movie/:id"
//         element={<MovieDetails />}
//         loader={MovieDetailsLoader}
//       ></Route>
//       <Route path="/NoPermit" element={<NoPermit/>}></Route>
//       <Route path="*" element={<PageNotFound />}></Route>
//     </Route>
//   )
// );

function App() {
  return (
    <div className="App container">
      <Header />

      <Router>
        <LoginV6></LoginV6>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>}>
            </Route>
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="Admin">
                <AdminPanel />
              </ProtectedRoute>
            }>
              {/* Child routes */}
              <Route path="create-user" element={
                <ProtectedRoute>
                  <UserForm />
                </ProtectedRoute>
              }></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </Router>


      {/* <RouterProvider router={router} /> */}

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
