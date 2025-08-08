import React, { useState } from "react";

const Replies = () => {
    const [reply, setReply] = useState("");

    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        setReply("");
    };

    return (
        <main className='replies'>
            <form className='modal_content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Responder</label>
                <textarea rows={5} value={reply} onChange={(e) => setReply(e.target.value)} type='text' name='reply' className='modalInput' />
                
                <button className='modalBtn'>ENVIAR</button>
            </form>
        </main>
    );
}; 

export default Replies;