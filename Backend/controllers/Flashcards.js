const mysql = require('mysql2');
const dbconfig = require('../configuration/dbconfig');

const db = mysql.createConnection(dbconfig.database);

const GetAllFlashcards = async (req, res, next) => {
    db.query(`select * from flashcards`,
    [],
    (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
    });
};

const GetFlashcardsBySetId = async (req, res, next) => {
    const setId = req.params.setId;
    db.query(`select * from flashcards where SetId=?`,
    [setId],
    (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
    });
};

const DeleteFlashcardById = async (req, res, next) => {
    const flashcardId = req.params.flashcardId;
    db.query(`delete from flashcards where Id =?`,
    [flashcardId],
    (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
    });
};

const EditFlashcard = async (req, res, next) => {
    const flashcard = req.body;
    db.query(`
    update flashcards
    set Front = ?, Back = ?
    where Id = ?`,
    [flashcard.Front, flashcard.Back, flashcard.Id],
    (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
    });
}

const AddFlashcard = async (req, res, next) => {
    const flashcard = req.body;
    const setId = req.params.setId;
    db.query(`
    INSERT INTO flashcards(Front, Back, setId)
    VALUES(?, ?, ?);
    
    SELECT LAST_INSERT_ID() AS LastInsertId;`,
    [flashcard.Front, flashcard.Back, setId],
    (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result[0].insertId);
        res.json(result[0]);
    });
}

module.exports = {
    GetAllFlashcards,
    GetFlashcardsBySetId,
    AddFlashcard,
    EditFlashcard,
    DeleteFlashcardById
};
