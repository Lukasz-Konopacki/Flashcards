const mysql = require('mysql2');
const dbconfig = require('../configuration/dbconfig');

const db = mysql.createConnection(dbconfig.database);

const GetSets = async (req, res, next) => {
    userId = req.userId;
    try {      
        db.query(`
        select s.id, s.name, count(f.id) as cardNumber, us.role
                        from sets s
                            join users_sets us on us.setId = s.Id								
                            left join flashcards f on f.setid = s.id
                        where us.userId = ?
                        group by s.id, s.name, us.role`,
        [userId],
        (err, result) => {
            if(err){
                console.log(err);
            }
            res.json(result);
        })     
    } catch (err) {
        console.log(err);
    }
};

const DeleteSetById = async (req, res, next) => {
    const userId = req.userId;
    const setId = req.params.setId;
    try {
        
        db.query(`CALL deleteSet(?, ?);`,
        [userId, setId],
        (err, result) => {
            if(err){
                console.log(err);
            }
            res.json(result);
        });                                      
    } catch (err) {
        console.log(err);
    }
};

const AddSet = async (req, res, next) => {
    const setName = req.params.setName;
    const userId = req.userId;
    try {
        db.query(`CALL addSet(?, ?);`,
        [setName, userId],
        (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result);
        })
    } catch (err) {
        console.log(err);
    }
}

const ChangeSetName  = async (req, res, next) => {
    const set = req.body;
    db.query(`
    update sets
    set Name = ?
    where Id = ?`,
    [set.name, set.id],
    (err, result) => {
        if(err){
            console.log(err);
        }
        res.status(200).json({ message: 'Success' });
    })     
}


module.exports = {
    GetSets,
    AddSet,
    DeleteSetById,
    ChangeSetName,
}