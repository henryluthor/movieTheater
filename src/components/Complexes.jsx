import { createContext, useContext, useEffect, useState } from "react";
import companyData from "../companyData.json";

const ComplexContext = createContext();

const Complexes = () => {
  const [complexes, setComplexes] = useState([]);
  const [complexesLoading, setComplexesLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [complexSelected, setComplexSelected] = useState(null);

  useEffect(() => {
    getComplexes();
  }, []);


  const getComplexes = async () => {

    try {

      var complexes = await fetch(companyData.complexes_URL);
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

  return (
    <ComplexContext.Provider value={complexSelected}>
      <>
      {errorMessage || complexesLoading ? (
        <div>
          {errorMessage || (
            <div>
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading complexes...</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
        {complexes.length > 0 ? (
          <>
          <p>SI SE ENCONTRARON COMPLEXES</p>
          <p>SHOWING COMPLEXES</p>
          {complexes.map((complex) => (
            <p>complex.name</p>
          ))}
          
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
