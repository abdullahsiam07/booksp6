import './login.css';

const Login = ({popupbtn}) =>{
    return(
        <div className="login-container">
             <h1>Login page</h1>
             <button onClick={popupbtn}>Cancel</button>
        </div>
    );
}

export default Login;