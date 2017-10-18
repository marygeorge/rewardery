import React from "react";

export const Signup = props =>
    <div className="signup-panel">
      <h2 className="signUpToday">Sign Up Today</h2>
      <input onChange={props.handleChange} className="form-control" id="parentFirstName" type="name" placeholder="First Name" />
      <input onChange={props.handleChange} className="form-control" id="parentLastName" type="name" placeholder="Last Name" />
      <input onChange={props.handleChange} className="form-control" id="parentEmail" type="email" placeholder="Email" />
      <input onChange={props.handleChange} className="form-control" id="parentUserName" type="username" placeholder="Username" />
      <input onChange={props.handleChange} className="form-control" id="parentPassword" type="password" placeholder="Password" />

      <input onClick={props.handleSubmit} type="button" className="signUp" id="signUp" value="Sign up!" />
    </div>;
