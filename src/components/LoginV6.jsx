import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";
import Spinner from "react-bootstrap/Spinner";
import MyDropdownMenu from "./MyDropdownMenu";

const LoginV6 = () => {
  const {user, authLoading} = useAuth();

  if(authLoading){
    return(
      <div>
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="me-2"
        />
        Loading user data...
      </div>
    )
  }
  else{
    return(
      <div>
        {user ? 
        <div>
          {/* <p>{JSON.stringify(user)}</p> */}
          <p>Welcome {user.email}</p>
          <MyDropdownMenu></MyDropdownMenu>
        </div>
        : 
        <div>
          <LoginForm></LoginForm>
        </div>}
      </div>
    )
  }
}

export default LoginV6;