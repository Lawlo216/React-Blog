import React from 'react'

const AddPostBtn = () => {
    return (
        <div className="fixed-action-btn">
            <a href="#add-post" className="btn-floating btn-large blue-grey darken-1 modal-trigger">
                <i className="large material-icons">add</i>
            </a>
            <ul>
                <li>
                    <a href="#tech-list-modal" className="btn-floating green modal-trigger">
                        <i className="material-icons">person</i>
                    </a>
                </li>
                <li>
                    <a href="#add-tech-modal" className="btn-floating red modal-trigger">
                        <i className="material-icons">person_add</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default AddPostBtn;
