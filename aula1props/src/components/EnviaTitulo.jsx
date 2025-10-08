import React, { useState } from "react";

function EnviaTitulo(props){
    const [inputValue, setInputValue] = useState("");

    const enviar = (e) => {
        e.preventDefault();
        props.chamada(inputValue); 
        setInputValue(""); 

    }
    

    return(
        <>
            <form onSubmit={enviar}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default EnviaTitulo;
