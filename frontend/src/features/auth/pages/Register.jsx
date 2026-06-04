import React from "react";
const Register=()=>{
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    return(
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                   <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email"  placeholder="Enter Email"/>
                    
                    </div> 
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button className="button primary-button">Register</button>
                </form>
            </div>
        </main>
    )
}

export default Register;