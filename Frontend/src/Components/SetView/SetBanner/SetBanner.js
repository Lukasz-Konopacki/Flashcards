import React from "react"
import styles from "./SetBanner.module.css"

const SetBanner = (props) =>{

    const  showAddForm  = props.showAddForm;

    return(
        <div className={styles.banner}>
            <h2>Cards</h2>
            <div className={styles.button} id="add-flashcards" onClick={showAddForm}>Add +</div>
        </div>      
    ) 
  }

  export default SetBanner;