import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signup = () => {
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                username,
            }),
            headers: {
                "Content-Type": "applications/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.error_message){
                    alert(data.error_message);
                } else {
                    alert("Conta criada com sucesso!");
                    navigate("/");
                }
                
            })
            .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        //chama o backend 
        signup();
        setEmail("");
        setUsername("");
        setPassword("");
    };

    return (
        <main className='register'>
            <h1 className='registerTitle'>Crie sua conta</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Nome de usuário</label>
                <input type='text' name='username' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                <br/>
                <label htmlFor='email' >Endereço de email</label>
                <input type='text' name='email' id='email' required value={email} onChange = {(e) => setEmail(e.target.value)} />
                <br/>
                <label htmlFor='password'>Senha</label>
                <input type='text' name='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='registerBtn'>Registrar-se</button>
                <p> Já tem uma conta ? <Link to='/'>Faça Login</Link></p>
            </form>
        </main>
    )
};

export default Register;