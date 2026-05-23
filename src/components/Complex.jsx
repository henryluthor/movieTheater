import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import {Link} from "react-router-dom";

const Complex = () => {

  const {id} = useParams(); // Captures the ":id" from the URL

  const [complex, setComplex] = useState({});
  const [isComplexLoading, setIsComplexLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [screens, setScreens] = useState([]);


  useEffect(() => {
    getComplexWithScreens(id);
  },[id]);


  const getComplexWithScreens = async (idComplex) => {
    try{
      var response = await fetch("https://localhost:7046/api/Complexes/"
        + idComplex + "/with-screens", {
        method: "GET",
        credentials: "include"
      });

      var data = await response.json();
      setComplex(data);
      setScreens(data.screens);
    }
    catch{
      console.error("An error ocurred while attempting to get Complex data");
      setErrorMessage("An error ocurred while attempting to get Complex data");
    }
    finally{
      setIsComplexLoading(false)
    }
  }

  return(
    <>
    {errorMessage || isComplexLoading ? (
      <div>
        {errorMessage || (
          <div>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
            />Loading complex...
          </div>
        )}
      </div>
    ):(
      <>
      <div>
        <h2>Complex Information</h2>
        <p>Name: {complex.name}</p>
        <Link>Create screen for this complex</Link>
        {(screens.length > 0) ? (
          <>
          <p>SI HAY SALAS</p>
          </>
        ):(
          <>
          <p>NO SCREENS FOUND FOR THIS COMPLEX</p>
          </>
        )}
      </div>
      </>
    )}    
    </>
  )
}

export default Complex;