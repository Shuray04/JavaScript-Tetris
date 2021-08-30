USE tetris;

CREATE TABLE highscore(
    id INT AUTO_INCREMENT NOT NULL, 
    player_name VARCHAR (18),
    score INT,
    primary key(id)
); 

INSERT INTO highscore(player_name, score) VALUES ("Andri", 22);
