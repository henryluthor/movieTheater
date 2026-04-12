import {useAuth} from "./AuthProvider";

const MyProfile = () => {
  const {user} = useAuth();
  // console.log("user at MyProfile:");
  // console.log(user);

  return(
    <div>
      <p>THIS IS MY PROFILE</p>
      {user ? (
        <>
        <p>USER FOUND FOR PROFILE</p>
        <p>{JSON.stringify(user)}</p>
        </>
      ):(
        <p>USER NOT FOUND FOR PROFILE BUA BUA BUA</p>
      )}
    </div>
  );
  
}

export default MyProfile;