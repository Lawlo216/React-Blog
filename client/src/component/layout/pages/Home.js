import React, { useContext, useEffect } from 'react';
import Posts from '../../posts/Posts';
import PostFilter from '../../posts/PostFilter';
// import AddPostBtn from '../../posts/AddPostBtn';
// import AddPostModal from '../../posts/AddPostModal';
import PostForm from '../../posts/PostForm';
import EditPostModal from '../../posts/EditPostModal';
import AuthContext from '../../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(()=> {
        authContext.loadUser();
        //eslint-disable-next-line
    },[]);

    return (
        <div className="bg-img">
            <PostFilter />
            <PostForm />
            <Posts />
            {/* <AddPostBtn />
            <AddPostModal /> */}
            <EditPostModal />
        </div>
    )
}

export default Home;
