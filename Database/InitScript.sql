CREATE DATABASE IF NOT EXISTS flashcards;

USE flashcards;

CREATE TABLE sets (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(30) NOT NULL
);

CREATE TABLE flashcards (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Front VARCHAR(50),
    Back VARCHAR(50),
    SetId INT NOT NULL,
    FOREIGN KEY(SetId) REFERENCES sets(Id)
);

CREATE TABLE users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Login VARCHAR(50) NOT NULL,
    Password VARCHAR(200) NOT NULL,
    Email VARCHAR(50) NOT NULL
);

CREATE TABLE users_sets (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    setId INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(Id),
    FOREIGN KEY(setId) REFERENCES sets(Id)
);

CREATE PROCEDURE deleteSet(IN inUserId INT, IN inSetId INT)
BEGIN
    DECLARE isAdmin INT;

    SELECT 1 INTO isAdmin
    FROM users_sets us
    WHERE us.role = 'admin'
    AND us.userId = inUserId
    AND us.setId = inSetId
    LIMIT 1;

    IF isAdmin = 1 THEN
        DELETE FROM flashcards WHERE SetId = inSetId;
        DELETE FROM users_sets WHERE setId = inSetId;
        DELETE FROM sets WHERE Id = inSetId;
    END IF;
END;

CREATE PROCEDURE addSet(IN inSetName VARCHAR(255), IN inUserId INT)
BEGIN
    DECLARE newSetId INT;
    
    INSERT INTO sets (Name) VALUES (inSetName);
    
    SET newSetId = LAST_INSERT_ID();
    
    INSERT INTO users_sets (userId, setId, role) VALUES (inUserId, newSetId, 'admin');
    
    SELECT newSetId AS SetId;
END;

INSERT INTO sets (Name) VALUES ('Animals');
INSERT INTO sets (Name) VALUES ('Fruits');
INSERT INTO sets (Name) VALUES ('Countries');

INSERT INTO flashcards (Front, Back, SetId) VALUES ('Cat', 'Gato', 1); -- Animal set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Dog', 'Perro', 1); -- Animal set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Lion', 'León', 1); -- Animal set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Elephant', 'Elefante', 1); -- Animal set

INSERT INTO flashcards (Front, Back, SetId) VALUES ('Grapes', 'Uvas', 2); -- Fruits set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Apple', 'Manzana', 2); -- Fruits set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Orange', 'Naranja', 2); -- Fruits set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Banana', 'Plátano', 2); -- Fruits set

INSERT INTO flashcards (Front, Back, SetId) VALUES ('Spain', 'España', 3); -- Countries set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Japan', 'Japón', 3); -- Countries set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('France', 'Francia', 3); -- Countries set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Germany', 'Alemania', 3); -- Countries set

INSERT INTO users(Login, Email, Password) VALUES ('admin', 'admin@gmail.com', '$2b$10$j/H17HnzcvTPXarWJ7OzM.iw3SeiWzV.98XkhYh4O8/jsGRnjPvam');

INSERT INTO users_sets(userId, setId, role) VALUES (1, 1, 'admin');
INSERT INTO users_sets(userId, setId, role) VALUES (1, 2, 'user');

INSERT INTO users_sets(userId, setId, role) VALUES (1, 3, 'admin');