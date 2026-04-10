import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";

const LoginV6 = () => {
  const {user, setUser, authLoading} = useAuth();

  // Implemented in AuthProvider.jsx
  // const logout = async () => {
  //   try{
  //     await fetch('https://localhost:7046/api/Auth/logout',{
  //       method: 'POST',
  //       credentials: "include"
  //     });

  //     setUser(null);
  //   }
  //   catch(error){
  //     console.error("An error ocurred while attempting to logout. " + error.message);
  //   }
  // }


  if(authLoading){
    return(
      <div>
        <p>LOADIN USER DATA</p>
      </div>
    )
  }
  else{
    return(
      <div>
        {/* <p>loading user data stopped</p> */}
        {user ? 
        <div>
          <p>{JSON.stringify(user)}</p>
          <p>Welcome {user.email}</p>
          {/* <button className="btn btn-primary" onClick={logout}>Logout</button> */}
        </div>
        : 
        <div>
          {/* <p>user not found</p> */}
          <LoginForm></LoginForm>
        </div>}
    </div>
    )
  }
}

export default LoginV6;