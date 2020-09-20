import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = props => {
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=> {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === 'Invalid Credentials'){
            M.toast({ html: 'Invalid Credentials' });
            clearErrors();
        }
        //eslint-disable-next-line
    },[error, isAuthenticated, props.history]);


    const [ user, setUser ] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(email ==='' || password ===''){
            M.toast({ html: 'Please fill all fileds' });
        } else {
            login({
                email, password
            });
        }
    }

    return (
        <form onSubmit={onSubmit} className="input-form">
            <h4>Login</h4>
            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="email" className="active">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="password" className="active">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange} required/>
                </div>
            </div>
            <input type="submit" value="Login" className="modal-close blue-grey darken-1 waves-effect waves-light btn" />
        </form>
    )
}

export default Login;
