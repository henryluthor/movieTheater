import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Complex = () => {

  const {id} = useParams(); // Captures the ":id" from the URL

  const [complex, setComplex] = useState({});
  const [isComplexLoading, setIsComplexLoading] = useState(true);


  useEffect(() => {
    getComplex(id);
  },[]);  


  const getComplex = async (idComplex) => {
    try{
      var response = await fetch("https://localhost:7046/api/Complex/" + idComplex, {
        method: "GET",
        credentials: "include"
      });

      var data = await response.json();
      setComplex(data);
    }
    catch{
      console.error("An error ocurred while attempting to get Complex data");
    }
    finally{
      setIsComplexLoading(false)
    }
  }

  return(
    <div>
      <h2>Complex Information</h2>
      <p>Name: {complex.name}</p>
    </div>
  )
}

export default Complex;