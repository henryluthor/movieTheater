import NoPermit from "./NoPermit";
import { useAuth } from "./AuthProvider"
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaEdit } from "react-icons/fa";
// import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

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


  const handleEdit = async (id) => {
    console.log("id is");
    console.log(id);
    var response = await fetch("https://localhost:7046/api/SystemUser/edit-user/" + id);
    var responseJson = await response.json();

    console.log("in userlist responseJson");
    console.log(responseJson);
  }

  
  
  return(
    <>
    {user? (
      <div>
        {usersLoading ? (
          <div>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
            />
            Loading users...
          </div>
        ):(
            users? (
              <>
              {/* <div>{JSON.stringify(users)}</div> */}
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>
                        {/* <button
                        onClick={() => handleEdit(user.id)}
                        title="Edit user"
                        aria-label="Edit user">
                          <FaEdit></FaEdit>
                        </button> */}

                        <Link to={`${user.id}/edit`}>Editar</Link>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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