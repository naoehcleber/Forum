import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
    const navigate = useNavigate();

    const [thread, setThread] = useState("");

    useEffect(() => {
        const checkUser = () => {
            if(!localStorage.getItem("_id")){
                navigate("/");
            } else{
                console.log("Autenticado");
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
            console.log(data);
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
            </main>
        </>
    )
};

export default Home;