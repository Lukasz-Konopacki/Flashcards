const express = require('express');
const router =  express.Router();

const {
    GetAllFlashcards,
    GetFlashcardsBySetId,
    EditFlashcard,
    DeleteFlashcardById,
    AddFlashcard
} = require('../controllers/Flashcards.js')

const {
    GetSets,
    AddSet,
    DeleteSetById,
    ChangeSetName
} = require('../controllers/Sets.js')

router.use("/sets", GetSets)
router.use('/flashcards', GetAllFlashcards);
router.use('/set/:setId', GetFlashcardsBySetId);
router.use('/addSet/:setName', AddSet)
router.use('/deleteSet/:setId', DeleteSetById)
router.use('/editSet/:setId', ChangeSetName)
router.use('/deleteFlashcard/:flashcardId', DeleteFlashcardById)
router.use('/editFlashcard/:flashcardId', EditFlashcard)
router.use('/addFlashcard/:setId', AddFlashcard)


module.exports = router;