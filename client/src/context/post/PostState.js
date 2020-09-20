import React, { useReducer } from 'react';
import axios from 'axios';
// import {v4 as uuidv4} from 'uuid';  
//(It's dummy, Mongoose DB will give you actual ID)
import PostContext from './postContext';
import postReducer from './postReducer';
import {
    GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_POSTS,
    CLEAR_FILTER,
    CLEAR_POSTS,
    POST_ERROR
} from '../types';

const PostState = props => {
    const initialState = {
        posts: [
            //Delete all （因為會 connect to DB)
            // {
            //     id: 1,
            //     title: 'Have a Great Weekend.',
            //     by: 'Mary Jill',
            //     content: 'What are you up to this weekend? I’m going to be interviewing my dad, and I’m curious to hear what he has to say about anything and everything…',
            //     date: '12/11/2012'
            // },
            // {
            //     id: 2,
            //     title: 'Weekend Mom',
            //     by: 'John Stone',
            //     content: 'What are you up to this weekend? We might take a nice little walk. By the wonderful Grace Farris.',
            //     date: '14/11/2012'
            // },
            // {
            //     id: 3,
            //     title: 'Four Fun Things',
            //     by: 'Johnny Smith',
            //     content: 'What are you wearing these days? I’ve been seeing puff-sleeve shirts all over the place',
            //     date: '12/13/2012'
            // }
        ],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(postReducer, initialState);


    //Get Post
    const getPosts = async () => {
        try {
            const res = await axios.get('/blog/posts');
            dispatch({ type: GET_POSTS, payload: res.data });
        } catch (error) {
            dispatch({ type: POST_ERROR , payload: error.response.msg });
        }
    }

    //Add Post
    const addPost = async post => {
        // front-end
        // post.id = uuidv4();
        // dispatch({ type: ADD_POST, payload: post });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/blog/posts', post, config);
            dispatch({ type: ADD_POST, payload: res.data });
        } catch (error) {
            dispatch({ type: POST_ERROR , payload: error.response.msg });
        }
    }

    //Delete Post
    const deletePost = async id => {
        try {
            await axios.delete(`/blog/posts/${id}`);
            dispatch({ type: DELETE_POST, payload: id });
        } catch (error) {
            dispatch({ type: POST_ERROR , payload: error.response.msg });
        }
    };

    //Update Post
    const updatePost = async post => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/blog/posts/${post._id}`, post, config);
            dispatch({ type: UPDATE_POST, payload: res.data });
        } catch (error) {
            dispatch({ type: POST_ERROR , payload: error.response.msg });
        }
    }

    // Clear Posts
    const clearPosts = () => {
        dispatch({ type: CLEAR_POSTS });
    }

    //Set Current Post
    const setCurrent = post => {
        dispatch({ type: SET_CURRENT, payload: post });
    }

    //Clear Current Post
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }


    //Filter Posts
    const filterPosts = text => {
        dispatch({ type: FILTER_POSTS, payload: text });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <PostContext.Provider value={{
            posts: state.posts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getPosts,
            addPost,
            deletePost,
            setCurrent,
            clearCurrent,
            updatePost,
            filterPosts,
            clearFilter,
            clearPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState;
