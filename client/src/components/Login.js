import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({email, password});
        setEmail("");
        setPassword("");

    };

    const loginUser = () => {
        fetch("http://localhost:4000/api/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => res.json() )
        .then((data) => {
            if(data.error_message) {
                alert(data.error_message);
            } else {
                alert(data.message);
                navigate("/dashboard");
                localStorage.setItem("_id", data.id);
            }
        })
        .catch((err) => console.error(err));

    };

    return (
        <main className='login'>
            <h1 className='loginTitle'>Faça Login na sua conta</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='email'>Endereço de email</label>
                <input type='text' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br></br>
                <label htmlFor='password'>Senha</label>
                <input type='password' name='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className='loginBtn'>Sign In</button>
                <p>
                    Não tem uma conta ? <Link to='/register'>Criar uma!</Link>
                </p>
            </form>
        </main>
    );
};

export default Login;
