import { useEffect, useState } from "react";

// To know what complex you are editing once the form replaces the table you use the hook useParams
import { useParams } from "react-router-dom";

const ComplexForm = () => {

  const [inputs, setInputs] = useState({
    name: ""
  });

  const {id} = useParams(); // Captures the ":id" from the URL
  const isEdit = Boolean(id); // If there is an id this form will be used to edit
  const [isComplexToEditLoading, setIsComplexToEditLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [errors, setErrors] = useState({}); // State to save API errors
  const [errorMessageFromApi, setErrorMessageFromApi] = useState(null);


  useEffect(() =>{
    if (isEdit) {
      getComplexToEdit(id);
    }
  },[]);


  const getComplexToEdit = async (complexToEditId) => {
    try{
      var response = await fetch("https://localhost:7046/api/Complex/" + complexToEditId,{
        method: "GET",
        credentials: "include"
      }
      );
      var responseJson = await response.json();

      setInputs({
        name: responseJson.name
      }
      );
    }
    catch(error){
      console.error("An error ocurred while attempting to get Complex data for edition. " + error.message);
    }
    finally{
      setIsComplexToEditLoading(false);
    }
    
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({...values, [name]: value}));

    // If there is an error for this field, we remove it from the state
    if(errors.Name){
      // setErrors((prevErrors) => {
      //   const newErrors = {...prevErrors};
      //   delete newErrors.Name; // Remove only the error from this field
      //   return newErrors;
      // })
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    // setErrors({}); // Clean previous errors

    var endpointToFetch = "https://localhost:7046/api/Complex";
    var requestInitMethod = "POST";

    if (isEdit){
      requestInitMethod = "PUT";
      endpointToFetch += `/${id}`;
    }

        
    try{
      var response = await fetch(endpointToFetch, {
        method: requestInitMethod,
        headers: {"Content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(inputs)
      });

      
      if(!response.ok){
        // If it is 400, ASP.NET sends an object with the details in the body
        if(response.status == 400){
          const data = await response.json();
          
          setErrorMessageFromApi(data.message);
          
          // // ASP.NET Core puts validation errors in data.errors
          // console.log("data.errors");
          // console.log(data.errors); // undefined
          // setErrors(data.errors || {});
        }
        return;
      }

      var responseJson = await response.json()
      
    }
    catch(error){
      console.error("An error ocurred while attempting to create complex. " + error.message);
    }
    finally{
      setIsSubmitting(false);
    }
  }

  

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">Complex name</label>
        <input
        className={errors.Name ? "input-error" : "form-control"} // "input-error" CSS class for red border
        id="name"
        name="name"
        type="text"
        value={inputs.name || ""}
        required
        maxLength={50}
        onChange={handleChange}
        ></input>

        {/* Display error messages for input Name */}
        {errors.Name && (
          <div style={{ fontSize: "0.8rem"}}>
            {errors.Name.map( (error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        {errorMessageFromApi && (
          <>
          <p className="error-message">{errorMessageFromApi}</p>
          </>
        )}
        <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Posting complex..." : "Submit"}</button>
      </form>
    </div>
  );
}

export default ComplexForm;