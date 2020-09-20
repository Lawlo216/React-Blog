import React, { useContext } from 'react';
import PostContext from '../../context/post/postContext';
import Moment from 'react-moment';

const PostItem = ({ post }) => {
    const postContext = useContext(PostContext);
    const { deletePost, setCurrent, clearCurrent } = postContext;

    const { _id, title, content, by, date } = post;

    const onDelete = () => {
        deletePost(_id);
        clearCurrent();
    }

    return (
        <div className="post-form">
            <a className="modal-trigger title">{title}</a>
            <br/>
            <a href="#!" onClick={onDelete} className="secondary-content">
                <i className="material-icons">close</i>
            </a> {' '}
            <a href="#top" onClick={()=> setCurrent(post)} className="secondary-content">
                <i className="material-icons">edit</i>
            </a>
            <span className="grey-text">
                by{' '}
                <span className="blue-grey-text">{by}</span> on <Moment format="D MMMM YYYY, h:mm a">{date}</Moment> 
            </span>
            <p>{content}</p>

        </div>
    )
}

export default PostItem;