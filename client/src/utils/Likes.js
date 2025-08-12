import React, { useState, useEffect } from "react";

const Likes = ({numberOfLikes, threadId}) => {
    const handleLikeFunction = () => {
        alert("Post Curtido");
    };

    return (
        <div className='likes_container'>
            <span class="material-symbols-outlined" onClick={handleLikeFunction}>
                thumb_up
            </span>
            <p style={{ color : "#434242"}}>
                {numberOfLikes === 0 ? "" : numberOfLikes}
            </p>
        </div>
    );
};

export default Likes;