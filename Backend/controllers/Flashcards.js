const fs = require('fs')
const sql = require('mssql')

const connectionString = "Data Source=LT00668\\SQLEXPRESS,1433;Initial Catalog=FlashcardApp;User Id=FlashcardApp;Password=FlashcardApp;Integrated Security=True;Min Pool Size=0;Max Pool Size=500;Pooling=true;TrustServerCertificate=true;"

const GetAllFlashcards = async (req, res, next) => {
    try {
        await sql.connect(connectionString);
        const result = await sql.query`select * from flashcards`
        res.json(result.recordset);
    } catch (err) {
        console.log(err);
    }
};

const GetFlashcardsBySetId = async (req, res, next) => {
    try {
        const setId = req.params.setId;
        await sql.connect(connectionString);
        const result = await sql.query`select * from flashcards where SetId=${setId}`
        //console.log(result);
        res.json(result.recordset);
    } catch (err) {
        console.log(err);
    }
};

const DeleteFlashcardById = async (req, res, next) => {
    try {
        const flashcardId = req.params.flashcardId;
        await sql.connect(connectionString);
        const result = await sql.query`delete from flashcards where Id =${flashcardId}`;
    } catch (err) {
        console.log(err);
    }
};

const EditFlashcard = async (req, res, next) => {
    const flashcard = req.body;
    try {
        await sql.connect(connectionString);

        const request = new sql.Request();
        request.input('id', sql.Int, flashcard.Id);
        request.input('front', sql.NVarChar, flashcard.Front);
        request.input('back', sql.NVarChar, flashcard.Back);
        query = `update flashcards
                 set Front = @front, Back = @back
                 where Id = @id`;
        const result = await request.query(query);

    } catch (err) {
        console.log(err);
    }
    res.status(200).json({ message: 'Success' });
}

const AddFlashcard = async (req, res, next) => {
    const flashcard = req.body;
    const setId = req.params.setId;
    try {
        await sql.connect(connectionString);

        const request = new sql.Request();
        request.input('setId', sql.Int, setId);
        request.input('front', sql.NVarChar, flashcard.Front);
        request.input('back', sql.NVarChar, flashcard.Back);

        query = `INSERT INTO flashcards(Front, Back, setId)
                 OUTPUT INSERTED.Id
                 VALUES(@front, @back, @setId)`;
        
        const result = await request.query(query);
        res.send(result.recordset[0]);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    GetAllFlashcards,
    GetFlashcardsBySetId,
    AddFlashcard,
    EditFlashcard,
    DeleteFlashcardById
};
