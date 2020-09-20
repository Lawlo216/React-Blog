import React, { useState, useContext, useEffect } from 'react';
import PostContext from '../../context/post/postContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddPostModal = () => {
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
        <div id="add-post" className="modal" style={modalStyle}>
        <div className="modal-content">
            <h4>Add Post</h4>
            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="title" className="active">Title</label>
                    <input type="text" name="title" value={title} onChange={onChange} />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <label htmlFor="content" className="active">Content</label>
                    <input type="text" name="content" value={content} onChange={onChange} />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="by" className="active">Author</label>
                    <input type="text" name="by" value={by} onChange={onChange} />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="date" className="active">Date</label>
                    <input type="text" name="date" value={date} onChange={onChange} />
                </div>
            </div>

        </div>
        <div className="modal-footer">
            <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-light btn">Submit</a>
        </div>

        {current && (
                <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>
            )}

    </div>
    )
}

const modalStyle = {
    width: "75%",
    height: "100%"
};

export default AddPostModal
