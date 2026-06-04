import React from "react";
import "../auth.form.scss"

const Login = ()=>{
    return(
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form>
                   <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email"  placeholder="Enter Email"/>
                    
                    </div> 
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button className="button primary-button">Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login;