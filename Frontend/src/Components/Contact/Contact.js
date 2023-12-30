import React from "react";
import styles from "./Contact.module.css"

const Contact = () => {

    return(
        <div id={styles.contact}>
            <h1>Formularz Kontaktowy</h1>        
            <form id="contactForm">
                <label id="emailLabel" htmlFor="email">E-Mail:</label>
                <input type="text" id="email" name="email"/>

                <label id="messageLabel" htmlFor="message">Wiadomość:</label>
                <textarea id="message" name="message"></textarea>

                <input id={styles.submit} type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Contact;