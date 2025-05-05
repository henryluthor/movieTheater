const LoginPost = (email, password) =>
{
    alert("Making login post with " + email + " and " + password);
}

const Login = () => {
    return (
        <div>
            <label>Email</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>
            {/* <button type="button" onClick={LoginPost("mailmail", "passpass")}>Login</button> */}
        </div>        
    );
};

export default Login;