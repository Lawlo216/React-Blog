import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);

    const { isAuthenticated , logout, user } = authContext;
    const { clearPosts } = postContext;

    const onLogout = () => {
        logout();
        clearPosts();
    }

    const authLinks = (
        <Fragment>
            <li>{ user && user.name }</li>
            <li>
                <a onClick={onLogout} href="#!"><i className="material-icons">logout</i></a>
            </li>
        </Fragment> 
    );

    const guestLinks = (
        <Fragment>
                <li><Link to ="/register">Register</Link></li>
                <li><Link to ="/login">Login</Link></li>
        </Fragment> 
    );


    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1">
            <Link to ="/" className="icon">BLOG</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to ="/about">About</Link></li>

                {isAuthenticated ? authLinks : guestLinks}
            </ul>
            </div>
            
        </nav>
    )
}

export default Navbar;
