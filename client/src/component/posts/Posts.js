import React, { Fragment, useContext, useEffect } from 'react';
import PostItem from './PostItem';
import PostContext from '../../context/post/postContext';

const Posts = () => {
    const postContext = useContext(PostContext);
    const { posts, filtered, getPosts } = postContext;
    
    useEffect(()=> {
        getPosts();
        //eslint-disable-next-line
    },[]);

    // if(posts !== null && posts.length === 0 && !loading) {
    //     return <h4>Please add a post</h4>;
    // }

    return (
        <Fragment>
            { filtered !== null ? filtered.map(post => (<PostItem key={post._id} post={post}/>)) 
            : posts.map(post => (
                <PostItem key={post._id} post={post}/>
            ))}
        </Fragment>
    );
};

export default Posts;
