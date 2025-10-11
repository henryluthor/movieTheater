import { createContext, useContext, useEffect, useState } from "react";
import companyData from "../companyData.json";

const ComplexContext = createContext();

const Complexes = () => {
  const [complexes, setComplexes] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [complexSelected, setComplexSelected] = useState(null);

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        var complexesArray = [];
        var complexes = await fetch(companyData.complexes_URL);
        var complexesJson = await complexes.json();

        // console.log("At useEffect, complexesJson[0] is:");
        // console.log(complexesJson[0]);
        // console.log("At useEffect, complexesJson[0].idComplex is:");
        // console.log(complexesJson[0].idComplex);
        setComplexSelected(complexesJson[0].idComplex);
        // console.log("At useEffect, complexSelected is:");
        // console.log(complexSelected);

        for (let i = 0; i < complexesJson.length; i++) {
          var complex = {
            id: complexesJson[i].idComplex,
            name: complexesJson[i].name,
          };

          complexesArray.push(complex);
        }

        setComplexes(complexesArray);
        setIsloading(false);
      } catch (error) {
        console.error(
          "An error ocurred while fetching theater complexes. " + error.message
        );
        setErrorMessage(
          "An error ocurred while fetching theater complexes. " + error.message
        );
      }
    };

    fetchComplexes();
  }, []);

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
        {errorMessage || isLoading ? (
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
          <div>
            <select value={complexSelected} onChange={handleChange}>
              {complexes.map((complex, index) => (
                <option key={index} value={complex.id}>
                  {complex.name}
                </option>
              ))}
            </select>
          </div>
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
