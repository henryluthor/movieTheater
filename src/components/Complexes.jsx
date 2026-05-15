import { createContext, useContext, useEffect, useState } from "react";
import companyData from "../companyData.json";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ComplexContext = createContext();

const Complexes = () => {
  const [complexes, setComplexes] = useState([]);
  const [complexesLoading, setComplexesLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [complexSelected, setComplexSelected] = useState("");

  useEffect(() => {
    // Delaying useEffect manually for testing
    // setTimeout(getComplexes, 3000);

    getComplexes();
  }, []);


  const getComplexes = async () => {

    try {

      var complexes = await fetch(companyData.complexes_URL, {
        credentials: "include"
      });

      var complexesJson = await complexes.json();
      
      if(complexesJson.length > 0){
        setComplexes(complexesJson);
      }      
      
      // setComplexSelected(complexesJson[0].idComplex);
    }
    catch (error) {
      console.error(
        "An error ocurred while fetching theater complexes. " + error.message
      );
      setErrorMessage(
        "An error ocurred while fetching theater complexes. " + error.message
      );
    }
    finally{
      setComplexesLoading(false);
    }
  };


  const handleChange = (event) => {
    // console.log("In handleChange, event.target.value is:");
    // console.log(event.target.value);
    // console.log("and its type is:");
    // console.log(typeof(event.target.value))
    setComplexSelected(event.target.value);
    // console.log("In handleChange, complexSelected is now:");
    // console.log(complexSelected);
    // console.log("and its type is:");
    // console.log(typeof(complexSelected));
  };


  const handleEdit = async (id) => {
    try{
      var response = await fetch("https://localhost:7046/api/Complex/" + id, {
        credentials: "include"
      });

      var responseJson = await response.json();
    }
    catch{
      //
    }
  }

  

  return (
    <ComplexContext.Provider value={complexSelected}>
      <>
      {errorMessage || complexesLoading ? (
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
              />
              Loading complexes...
            </div>
          )}
        </div>
      ) : (
        <>
        {complexes.length > 0 ? (
          <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {complexes.map((complex) => (
                <tr key={complex.idComplex}>
                  <td>{complex.name}</td>
                  <td>
                    {/* <button
                    onClick={handleEdit(complex.idComplex)}
                    title="Edit complex"
                    aria-label="Edit complex"
                    >
                      <FaEdit></FaEdit>
                    </button> */}

                    <Link to={`${complex.idComplex}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          
          <select value={complexSelected} onChange={handleChange}>
            {complexes.map((complex, index) => (
              <option key={index} value={complex.id}>
                {complex.name}
              </option>
            ))}
          </select>
          </>
        ):(
          <p>COMPLEXES NOT FOUND</p>
        )}
        </>
      )}
      </>
      <ComplexMovies></ComplexMovies>
    </ComplexContext.Provider>
  );
};

const ComplexMovies = () => {
  const complexSelected = useContext(ComplexContext);

  return (
    complexSelected && (<p>SHOW THERE THE FUNCTIONS OF COMPLEX NUMBER {complexSelected}</p>)
  );
};

export { Complexes, ComplexMovies };
