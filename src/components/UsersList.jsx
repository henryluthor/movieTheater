import NoPermit from "./NoPermit";
import { useAuth } from "./AuthProvider"
import { useEffect, useState } from "react";

const UsersList = () => {
  const user = useAuth();

  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Delaying useEffect manually for testing
    // setTimeout(getUsers, 3000);

    getUsers();
  },[]);

  const getUsers = async () => {
    
    try{
      var response = await fetch("https://localhost:7046/api/SystemUser/");
      var responseJson = await response.json();      
      setUsers(responseJson);
    }
    catch(error){
      console.error("An error ocurred while attempting to fetch users. " + error.message);
    }
    finally{
      setUsersLoading(false);
    }
  }

  
  
  return(
    <>
    {user? (
      <div>
        {usersLoading ? (
          <>
          <p>LOADING USERS...</p>
          </>
        ):(
            users? (
              <>
                <div>{JSON.stringify(users)}</div>
              </>
            ):(
              <>
              <p>USERS NOT LOADED</p>
              </>
            )
        )}
      </div>
    ):(
      <NoPermit />
    )}
    </>
  );
}

export default UsersList;