import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Comments from "../utils/Comments";
import Likes from "../utils/Likes";

const Home = () => {
    const navigate = useNavigate();

    const [thread, setThread] = useState("");

    const [threadList, setThreadList] = useState([]);

    useEffect(() => {
        const checkUser = () => {
            if(!localStorage.getItem("_id")){
                navigate("/");
            } else{
                fetch("http://localhost:4000/api/all/threads")
                .then((res) => res.json())
                .then((data) => setThreadList(data.threads))
                .catch((err) => console.error(err));
            };
        };
        checkUser();
        },[navigate]);


    const createThread = () => {
        fetch("http://localhost:4000/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json)
        .then((data) => {
            alert(data.messaage);
            setThreadList(data.threads);
        })
        .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createThread();
        setThread("");

    };

    return(
        <>
            <Nav />
            <main className='home'>
                <h2 className='homeTitle'> Crie sua thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home_container'>
                        <label htmlFor='thread'>Titulo / Descrição</label>
                        <input type='text' name='thread' required value={thread} onChange={(e) => setThread(e.target.value)} />
                    </div>
                    <button className='homeBtn'> Criar Thread</button>
                </form>
                <div className='thread_container'>
                    {threadList.map((thread) => (
                        <div className='thread_item' key={thread.id}>
                            <p>{thread.title}</p>
                            <div className='react_container'> 
                                <Likes numberOfLikes={thread.likes.lenght} />
                                <Comments numberOfComments={thread.replies.lenght} threadId={thread.id} title={thread.title}/>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
};

export default Home;