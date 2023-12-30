const sql = require('mssql')
const connectionString = "Data Source=LT00668\\SQLEXPRESS,1433;Initial Catalog=FlashcardApp;User Id=FlashcardApp;Password=FlashcardApp;Integrated Security=True;Min Pool Size=0;Max Pool Size=500;Pooling=true;TrustServerCertificate=true;"

const GetSets = async (req, res, next) => {
    try {
        await sql.connect(connectionString);
        const result = await sql.query`select s.id, s.name, count(f.id) as cardNumber
                                       from sets s
                                            left join flashcards f on f.setid = s.id
                                       group by s.id, s.name`;
                                       
        res.json(result.recordset);
    } catch (err) {
        console.log(err);
    }
};

const DeleteSetById = async (req, res, next) => {
    try {
        const setId = req.params.setId;
        await sql.connect(connectionString);
        const result = await sql.query` delete from flashcards
                                        where SetId = ${setId};
                                        
                                        delete from sets 
                                        where sets.Id = ${setId};`;                               
    } catch (err) {
        console.log(err);
    }
};

const AddSet = async (req, res, next) => {
    const setName = req.params.setName;
    try {
        await sql.connect(connectionString);

        const request = new sql.Request();
        request.input('name', sql.NVarChar, setName);

        query = `INSERT INTO sets(Name)
                 OUTPUT INSERTED.Id
                 VALUES(@name)`;
        
        const result = await request.query(query);
        res.send(result.recordset[0]);
    } catch (err) {
        console.log(err);
    }
}

const ChangeSetName  = async (req, res, next) => {
    const set = req.body;
    console.log(req.body);
    try {
        await sql.connect(connectionString);

        const request = new sql.Request();
        request.input('name', sql.NVarChar, set.name);
        request.input('id', sql.NVarChar, set.id);
        query = `update sets
                 set Name = @name
                 where Id = @id`;
        const result = await request.query(query);

    } catch (err) {
        console.log(err);
    }
    res.status(200).json({ message: 'Success' });
}


module.exports = {
    GetSets,
    AddSet,
    DeleteSetById,
    ChangeSetName,
}