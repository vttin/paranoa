CREATE DATABASE bd_clientes; -- Cria um banco de dados

CREATE TABLE clientes (
    id int(4) AUTO_INCREMENT,
    nome varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE clientes RENAME TO clientes_novos;

ALTER TABLE clientes_novos ADD telefone varchar(20);
ALTER TABLE clientes_novos DROP COLUMN telefone;

INSERT INTO clientes_novos (id, nome, email) VALUES (30, 'victor', 'victor@gmail.com');

SELECT nome FROM clientes_novos;

SELECT * FROM clientes_novos;

-- DELETE clientes_novos WHERE id = 3;

UPDATE clientes_novos SET email = 'novoEmail@gmail.com' WHERE id = 30;

SELECT * from clientes_novos WHERE id = 30

delete from clientes_novos WHERE id = 31

SELECT id, nome AS preciso FROM clientes_novos

INSERT INTO numeros(id, coluna1, coluna2) 
VALUES(1, 300, 300)
SELECT coluna1 + coluna2 AS soma FROM numeros
SELECT coluna1, coluna2, coluna1 + coluna2 AS soma FROM numeros
SELECT MAX(coluna1) AS total_vendas FROM numeros
SELECT min(coluna1) AS total_vendas FROM numeros
SELECT AVG(coluna1) AS total_vendas FROM numeros
  SELECT COUNT(coluna1) AS total_vendas FROM numeros

  CREATE TABLE estados(
	id_estado int PRIMARY KEY,
  	nome_estado VARCHAR(100)
)

INSERT INTO estados (id_estado, nome_estado) 
VALUES (1, 'sao paulo'), (2, 'Rio de janeiro'), (3, 'minas gerais')

CREATE TABLE pessoas(
	id INT PRIMARY KEY,
  nome VARCHAR(100),
  id_estado INT,
  FOREIGN KEY (id_estado) REFERENCES estados(id_estado)
)

insert into pessoas(id, nome, id_estado) VALUES 
(1, 'joao', 2),
(2, 'igor', 3),
(3, 'bia', 1)

SELECT pessoas.id, pessoas.nome, estados.nome_estado FROM pessoas
JOIN estados ON pessoas.id_estado = estados.id_estado

DROP TABLE estados

CREATE TABLE usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
)

CREATE TABLE emprestimos(
	  id INT AUTO_INCREMENT PRIMARY KEY,
  	usuario_id INT,
    livro_id INT,
	  data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (livro_id) REFERENCES livros(id)

)