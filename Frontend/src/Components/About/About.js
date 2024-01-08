import React from "react";
import styles from "./About.module.css";

const About = () =>{
    return(
        <div className={styles.about}>
            <h1> Aplikacja do nauki języka</h1>
            <p>
                Projekt zaliczeniowy z przedmiotu "Technologie Internetu" celem projektu jest stworzenie aplikacji internetowej do nauki języków. 
                Główną funkcjonalnością projektu jest system fiszek,  które użytkownicy będą mogli tworzyć, importować, edytować i usuwać. 
                Aplikacja będzie korzystać z bazy danych do przechowywania zestawów fiszek, co pozwoli użytkownikom na łatwe zarządzanie swoimi materiałami do nauki.
                W przyszłości planowane jest rozszerzenie aplikacji o quizy językowe, gry, interaktywne lekcje.
            </p>
        
            <h3>Zakres funkcjonalności</h3>
            <ul>
                <li>Zaimplemenotowanie możliwości dodawania/edycji/usuwania, zestawów fiszek oraz możliwość odpalenia zestawu w trybie gry.</li>
                <li>Zapisyywanie utworzonych zbiorów i pojedyczych fiszek w bazie danych</li>
                <li>Współdziałanie z instjiejącym tłumaczem np. Google translate, Pons w celu podpowiedzi tłumaczenia</li>
            </ul>
        
            <h3>Technologie, którę chciałbym wykorzystać do stworzenia aplikacji</h3>
            <ol>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>MySql</li>
            </ol>
        
            <h3>Wstępna makieta interfejsu użytkownika</h3>
            <img src="/Img/Frame1.png" alt="makieta interfejsu użytkownika" width="960" height="540"/>
        
        
            <h3>Wstępny projekt tabeli z informacjami o  poszczególnych zbiorach</h3>
            
            <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>number of cards</th>
                    <th>Buttons</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td className={styles.names}>Ropas</td>
                    <td>34</td>
                    <td> <button>Edit</button> <button>Delete</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td className={styles.names}>Animales</td>
                    <td>22</td>
                    <td> <button>Edit</button> <button>Delete</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td className={styles.names}>Partes del cuerpo</td>
                    <td>13</td>
                    <td> <button>Edit</button> <button>Delete</button></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td className={styles.names}>Tiempo</td>
                    <td>45</td>
                    <td> <button>Edit</button> <button>Delete</button></td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}

export default About;