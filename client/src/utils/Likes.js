import React, { useState, useEffect } from "react";

const Likes = ({numberOfLikes, threadId}) => {
    const handleLikeFunction = () => {
        fetch("http://localhost:4000/api/thread/like", {
            method: "POST",
            body: JSON.stringify({
                threadId,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.error_message){
                alert(data.error_message);
            }else{
                alert(data.message);
            }
        })
        .catch((err) => console.error(err));
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