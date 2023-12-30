import React from "react"
import Flashcard from "./Flashcard/Flashcard"
import styles from "./FlashcardList.module.css"

const FlashcardList = (props) =>{
    const flashcards = props.flashcards.map((obj, index) => ({
      ...obj,
      key: index + 1,
    }));
    const remove = props.remove;
    const edit = props.edit;


    return(
    <div className={styles.set}>
      {
        flashcards.map(el => (
          <Flashcard
            key={el.key}
            id={el.Id}
            front={el.Front}
            back={el.Back}
            remove = {remove}
            edit = {edit}
          />
        ))
      }     
    </div>
    ) 
  }

  export default FlashcardList;