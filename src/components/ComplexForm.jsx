import { useState } from "react";

const ComplexForm = () => {

  const [inputs, setInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({...values, [name]: value}));
  }



  const handleSubmit = async (event) => {

    event.preventDefault();
    setIsSubmitting(true);
    
    try{
      console.log("after try, inputs.complexName");
      console.log(inputs.complexName);
      console.log(typeof(inputs.complexName));

      const urlCreateUser =      "https://localhost:7046/api/SystemUser/create-user";

      const xxxx =               "https://localhost:7046/api/Complex";

      var response = await fetch("https://localhost:7046/api/Complex", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(inputs)
      });

      console.log("complex submit response");
      console.log(response);

      var responseJson = await response.json()
      console.log("Al crear complex responseJson");
      console.log(responseJson);
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
        <label className="form-label" htmlFor="complexName">Complex name</label>
        <input
        className="form-control"
        id="name"
        name="name"
        type="text"
        onChange={handleChange}
        ></input>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ComplexForm;