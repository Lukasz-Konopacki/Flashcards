import React from "react"
import styles from "./AddFlashcardForm.module.css"

const AddFlashcardForm = (props) =>{

    const closeForm = props.close;
    const addFlashcard = props.addFlashcard;
    const flashcard = props.flashcard;

    const [topValue, setTopValue] = React.useState(flashcard.Front ?? "");
    const [bottomValue, setBottomValue] = React.useState(flashcard.Back ?? "");
    const [showError, setShowError] = React.useState(false);
    const save = () =>{
        if(topValue.length < 3 || bottomValue.length < 3)
            setShowError(true);
        else
            addFlashcard(topValue, bottomValue);
    }

    return(
    <div className={styles.container}>
        <div className={styles.topBar}>
            <div className={styles.button} onClick={closeForm}>X</div>
        </div>
        <input id="flashcard-front" className={styles.input} type="text" placeholder="Front" value={topValue} onChange={(e) => setTopValue(e.target.value)}/>
        <hr/>
        <input id="flashcard-back" className={styles.input} type="text" placeholder="Back" value={bottomValue} onChange={(e) => setBottomValue(e.target.value)}/>
        <p className={styles.error}>{showError ? "Błąd: Jedno z pól ma mniej niż 3 znaki" : ""}</p>
        <div className={styles.downBar}>
            <div id="save-flashcard" className={styles.button} onClick={save}>Save</div>
            <div id="check-flashcard" className={styles.button}>Check</div>
        </div>
    </div>
    ) 
  }

  export default AddFlashcardForm;