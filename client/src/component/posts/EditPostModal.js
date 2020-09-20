import React, { useState, useContext, useEffect } from 'react';
import PostContext from '../../context/post/postContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditPostModal = () => {
    const postContext = useContext(PostContext);
    const { updatePost, current } = postContext;

    const [post, setPost ] = useState({
        title: '',
        by: '',
        content: '',
        date: ''
    });

    const { title, by, content, date } = post;

    useEffect(()=> {
        if(current !== null){
            setPost(current);
        } 
    },[postContext, current]);

    const onChange = e => setPost({ ...post, [e.target.name]: e.target.value });

    const onSubmit = () => {
        if(title ==='' || content ===''){
            M.toast({ html: 'Please enter fileds' });
        } else{
            updatePost(post);
        }
        setPost({
            title: '',
            by: '',
            content: '',
            date: new Date()
        });
    };

    return (
        <div id="edit-post" className="modal" style={modalStyle}>
        <div className="modal-content">
            <h4>Edit Post</h4>

            <div className="row">
                <div className="input-field col s12">
                    <input type="text" name="title" value={title} onChange={onChange} />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <input type="text" name="content" value={content} onChange={onChange} />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s6">
                    <input type="text" name="by" value={by} onChange={onChange} />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s6">
                    <input type="text" name="date" value={date} onChange={onChange} />
                </div>
            </div>

        </div>
        <div className="modal-footer">
            <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-light btn">Submit</a>
        </div>
    </div>
    )
}

const modalStyle = {
    width: "75%",
    height: "75%"
};

export default EditPostModal;
