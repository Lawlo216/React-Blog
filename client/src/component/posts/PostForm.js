import React, { useState, useContext, useEffect } from 'react';
import PostContext from '../../context/post/postContext';

const PostForm = () => {
    const postContext = useContext(PostContext);
    const { addPost, updatePost, clearCurrent, current } = postContext;

    useEffect(()=> {
        if(current!== null){
            setPost(current);
        } else {
            setPost({
                title: '',
                by: '',
                content: '',
                date: ''
            });
        }
    },[postContext, current]);

    const [post, setPost ] = useState({
        title: '',
        by: '',
        content: '',
        date: ''
    });

    const { title, by, content, date } = post;


    const onChange = e => setPost({ ...post, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addPost(post);
        } else {
            updatePost(post);
        }
        setPost({
            title: '',
            by: '',
            content: '',
            date: new Date()
        });
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
    <form id="top" className="post-form" style={{textAlign:'center'}}>
            <h2 className="text-primarty post-text">Post</h2>
            <input type="text" placeholder="title" name="title" value={title} onChange={onChange} />
            <input type="text" placeholder="by" name="by" value={by} onChange={onChange} /> <br />
            <input type="Date" placeholder="date" name="date" value={date} onChange={onChange} />
            <textarea type="text" style={{height:'200px'}} placeholder="content" name="content" value={content} onChange={onChange} />
            <div className="modal-footer"><br />
            <a href="#!" onClick={onSubmit} className="modal-close blue-grey darken-1 waves-effect waves-light btn">Submit</a>{' '}
            {current && (
            <button className="modal-close blue-grey darken-1 waves-effect waves-light btn" onClick={clearAll}>Clear</button>
            )}
            </div> 
        </form>
    )
}


export default PostForm;
