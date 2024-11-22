CREATE DATABASE playsong;
USE playsong;

/* Lógico_1: */

CREATE TABLE Artistas (
    id_artista INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    estilo VARCHAR(35),
    genero VARCHAR(10)
);

CREATE TABLE Albuns (
    id_album INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(35),
    data_criacao DATE,
    qnt_musica INT
);

CREATE TABLE Possui (
    fk_Artistas_id_artista INT,
    fk_Albuns_id_album INT
);
 
ALTER TABLE Possui ADD CONSTRAINT FK_Possui_1
    FOREIGN KEY (fk_Artistas_id_artista)
    REFERENCES Artistas (id_artista)
    ON DELETE RESTRICT;
 
ALTER TABLE Possui ADD CONSTRAINT FK_Possui_2
    FOREIGN KEY (fk_Albuns_id_album)
    REFERENCES Albuns (id_album)
    ON DELETE RESTRICT;

INSERT INTO Artistas (nome, estilo, genero) VALUES
('Ariana Grande', 'Pop', 'Feminino'),
('Ed Sheeran', 'Pop', 'Masculino'),
('Billie Eilish', 'Alternative', 'Feminino'),
('Drake', 'Rap', 'Masculino'),
('Taylor Swift', 'Pop', 'Feminino'),
('Shakira', 'Pop', 'Feminino'),
('Bruno Mars', 'Pop', 'Masculino'),
('Dua Lipa', 'Pop', 'Feminino'),
('Kendrick Lamar', 'Rap', 'Masculino'),
('The Weeknd', 'R&B', 'Masculino');

INSERT INTO Albuns (titulo, data_criacao, qnt_musica) VALUES
('Thank U, Next', '2019-02-08', 12),
('Divide', '2017-03-03', 16),
('When We All Fall Asleep', '2019-03-29', 14),
('Scorpion', '2018-06-29', 25),
('Lover', '2019-08-23', 18),
('El Dorado', '2017-05-26', 11),
('24K Magic', '2016-11-18', 9),
('Future Nostalgia', '2020-03-27', 11),
('DAMN.', '2017-04-14', 14),
('After Hours', '2020-03-20', 14);

