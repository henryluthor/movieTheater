import { useEffect, useState } from "react";
import companyData from "../companyData.json";

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

        setComplexSelected(complexesJson[0]);

        for (let i = 0; i < complexesJson.length; i++) {
          var complex = {
            id: complexesJson[i].id,
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
    setComplexSelected(event.target.value);
  };

  return (
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

          <p>The complex selected is {complexSelected.idComplex}</p>
        </div>
      )}
    </>
  );
};

export default Complexes;
