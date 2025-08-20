import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Comments = ({ numberOfComments, threadId }) => {
    const navigate = useNavigate();

    const handleAddComment = () => {
        navigate(`/${threadId}/replies`);
    };

    return (
        <div className='lke_container'>
            <svg>
            <span class="material-symbols-outlined">
                comment
            </span>
            </svg>
            <p style={{ color: "#434242" }}>
                {numberOfComments === 0 ? "" : numberOfComments}
            </p>
        </div>
    );
};

export default Comments