Create table sets(
	ID INT IDENTITY NOT NULL PRIMARY KEY,
	Name varchar(30) NOT NULL,
);

Create table flashcards(
	ID INT IDENTITY NOT NULL PRIMARY KEY,
	Front varchar(50),
	Back varchar(50),
	SetId int not null
);

ALTER TABLE flashcards ADD CONSTRAINT [FK_sets_flashcards] FOREIGN KEY(SetId)
REFERENCES sets (Id);


INSERT INTO sets (Name) VALUES ('Animals');
INSERT INTO sets (Name) VALUES ('Fruits');
INSERT INTO sets (Name) VALUES ('Countries');

-- Example inserts for 'flashcards' table referencing 'sets' table using SetId
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Cat', 'Gato', 1); -- Animal set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Dog', 'Perro', 1); -- Animal set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Lion', 'León', 1); -- Animal set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Elephant', 'Elefante', 1); -- Animal set


INSERT INTO flashcards (Front, Back, SetId) VALUES ('Grapes', 'Uvas', 5); -- Fruits set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Apple', 'Manzana', 5); -- Fruits set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Orange', 'Naranja', 5); -- Fruits set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Banana', 'Plátano', 5); -- Fruits set

INSERT INTO flashcards (Front, Back, SetId) VALUES ('Spain', 'España', 3); -- Countries set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Japan', 'Japón', 3); -- Countries set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('France', 'Francia', 3); -- Countries set
INSERT INTO flashcards (Front, Back, SetId) VALUES ('Germany', 'Alemania', 3); -- Countries set