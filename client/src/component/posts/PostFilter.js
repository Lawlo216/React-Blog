import React, {useContext, useRef, useEffect } from 'react';
import PostContext from '../../context/post/postContext';

const PostFilter = () => {
    const postContext = useContext(PostContext);
    const text = useRef('');

    const { filterPosts, clearFilter, filtered } = postContext;

    useEffect(()=> {
        if(filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if(text.current.value !== '') {
            filterPosts(e.target.value);
        } else {
            clearFilter();
        }
    }


    return (
        <nav style={{ marginBottom: '30px' }} className="transparent">
            <div className="nav-wrapper">
            <form>
                <div className="input-field">
                <input id="search" type="search" placeholder="Search Post.." ref={text} onChange={onChange}/>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
                </div>
            </form>
            </div>
      </nav>
    )
}

export default PostFilter;
