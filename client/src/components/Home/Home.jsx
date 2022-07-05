import React from "react";
import style from "./home.module.css"
import profesorOak from "./img/profesorOak.png"
import pikachu from "./img/pikachu.png"

export default function Home(){
    return(
    
    <div className={style.container}>
        <div className={style.welcomeTitle} >
            <h1>Hi, im profesor Oak: Welcome to my Pokemon App</h1><br />
            <h3> Create a new a account and own your first Pokemon Avatar today!</h3>
        </div>
        <div>
            <img className={style.welcomeImage}  src={profesorOak} alt="profesor Oaks welcoming" />
            <img className={style.pikachu}  src={pikachu} alt="profesor Oaks welcoming" /> 
        </div>
            <div className={style.botonLogin}>

                <a href="/register"  className={style.boton}> SIGN UP!</a>
            </div>
    </div>
    )
}