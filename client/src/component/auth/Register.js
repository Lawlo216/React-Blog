import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = props => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=> {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === 'User already exists'){
            M.toast({ html: 'User already exists' });
            clearErrors();
        }
        //eslint-disable-next-line
    },[error, isAuthenticated, props.history]);

    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            M.toast({ html: 'Please enter all fileds'});
        } else if (password !== password2) {
            M.toast({ html: 'Password do not match'});
        } else {
            register({ name, email, password });
        }
    }

    return (
        <form onSubmit={onSubmit} className="input-form">
            <h4>Register</h4>
            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="name" className="active">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="email" className="active">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="password" className="active">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange} minLength="6"/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="password2" className="active">Confirm Password</label>
                    <input type="text" name="password2" value={password2} onChange={onChange} minLength="6"/>
                </div>
            </div>


            <input type="submit" value="Register" className="modal-close blue-grey darken-1 waves-effect waves-light btn" />

            </form>
    )
}

export default Register;
