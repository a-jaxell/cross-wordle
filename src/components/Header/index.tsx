import React from "react";


export default function Header(){
    const currentPage = '';
    return (
        <>
        <h1>
            { currentPage || 'Wordle' }
        </h1>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/highscores">Highscores</a></li>
        </ul>
        </>   
    )
}