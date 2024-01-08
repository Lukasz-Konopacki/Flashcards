import React from "react";
import styles from "./Flashcard.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faTrash } from '@fortawesome/free-solid-svg-icons'

const Flashcard = ({id, front, back, remove, edit}) =>{
    return (
      <div className={styles.card}>
          <div className={styles.text}>
              <span>{front}</span>
              <hr/>
              <span>{back}</span>
          </div>
          <div className={styles.buttons}>
              <FontAwesomeIcon icon={faPaintBrush} className={styles.icon} onClick={() => edit(id)}/>
              <FontAwesomeIcon icon={faTrash} className={styles.icon} onClick={() => { remove(id)} }/>
          </div>
      </div>
    );
  }

export default Flashcard;