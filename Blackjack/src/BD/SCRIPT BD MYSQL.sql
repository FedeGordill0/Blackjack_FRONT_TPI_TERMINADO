create database blackjack_tpi_final;
use blackjack_tpi_final;
create table usuario(
    id int NOT NULL auto_increment,
    usuario varchar(100) NOT NULL,
    clave varchar(100) NOT NULL,
CONSTRAINT pk_usuario PRIMARY KEY (id)
);

create table carta
(
	id_carta int NOT NULL auto_increment,
    valor int NOT NULL,
    carta varchar(200),
    imagen varchar(500),
    isAs smallint NOT NULL,
    CONSTRAINT pk_carta PRIMARY KEY (id_carta)
);

create table jugada
(
    id_jugada int NOT NULL auto_increment,
    id_usuario int NOT NULL,
    estado smallint NOT NULL,
    CONSTRAINT pk_jugada PRIMARY KEY (id_jugada),
    CONSTRAINT fk_jugada_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE partida
(
    id_partida int NOT NULL auto_increment,
    id_jugada int NOT NULL,
    puntos_jugador int NOT NULL,
    puntos_croupier int NOT NULL,
    estado smallint NOT NULL,
    resultado varchar(200),
    CONSTRAINT pk_partida PRIMARY KEY (id_partida),
    CONSTRAINT fk_jugada_partida FOREIGN KEY (id_jugada) REFERENCES jugada (id_jugada)
);

CREATE TABLE carta_jugada
(
    id_carta_jugada int auto_increment,
    id_carta int NOT NULL,
    id_partida int NOT NULL,
    jugador varchar(100),
    CONSTRAINT pk_carta_jugada PRIMARY KEY (id_carta_jugada),
    CONSTRAINT fk_cartaJug_carta FOREIGN KEY (id_carta) REFERENCES carta (id_carta),
    CONSTRAINT fk_cartaJug_partida FOREIGN KEY (id_partida) REFERENCES partida (id_partida)
);

insert into carta values(1, 1, "t_as", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Playing_card_club_A.svg/60px-Playing_card_club_A.svg.png", 1);
insert into carta values(2, 2, "t_2", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Playing_card_club_2.svg/60px-Playing_card_club_2.svg.png", 0);
insert into carta values(3, 3, "t_3", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/60px-Playing_card_club_3.svg.png", 0);
insert into carta values(4, 4, "t_4", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/60px-Playing_card_club_4.svg.png", 0);
insert into carta values(5, 5, "t_5", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/60px-Playing_card_club_5.svg.png", 0);
insert into carta values(6, 6, "t_6", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Playing_card_club_6.svg/60px-Playing_card_club_6.svg.png", 0);
insert into carta values(7, 7, "t_7", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Playing_card_club_7.svg/60px-Playing_card_club_7.svg.png", 0);
insert into carta values(8, 8, "t_8", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Playing_card_club_8.svg/60px-Playing_card_club_8.svg.png", 0);
insert into carta values(9, 9, "t_9", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/60px-Playing_card_club_9.svg.png", 0);
insert into carta values(10, 10, "t_10", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Playing_card_club_10.svg/60px-Playing_card_club_10.svg.png", 0);
insert into carta values(11, 10, "t_j", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Playing_card_club_J.svg/60px-Playing_card_club_J.svg.png", 0);
insert into carta values(12, 10, "t_q", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_club_Q.svg/60px-Playing_card_club_Q.svg.png", 0);
insert into carta values(13, 10, "t_k", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Playing_card_club_K.svg/60px-Playing_card_club_K.svg.png", 0);
insert into carta values(14, 1, "d_as", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Playing_card_diamond_A.svg/60px-Playing_card_diamond_A.svg.png", 1);
insert into carta values(15, 2, "d_2", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Playing_card_diamond_2.svg/60px-Playing_card_diamond_2.svg.png", 0);
insert into carta values(16, 3, "d_3", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/60px-Playing_card_diamond_3.svg.png", 0);
insert into carta values(17, 4, "d_4", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Playing_card_diamond_4.svg/60px-Playing_card_diamond_4.svg.png", 0);
insert into carta values(18, 5, "d_5", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Playing_card_diamond_5.svg/60px-Playing_card_diamond_5.svg.png", 0);
insert into carta values(19, 6, "d_6", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Playing_card_diamond_6.svg/60px-Playing_card_diamond_6.svg.png", 0);
insert into carta values(20, 7, "d_7", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Playing_card_diamond_7.svg/60px-Playing_card_diamond_7.svg.png", 0);
insert into carta values(21, 8, "d_8", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/60px-Playing_card_diamond_8.svg.png", 0);
insert into carta values(22, 9, "d_9", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Playing_card_diamond_9.svg/60px-Playing_card_diamond_9.svg.png", 0);
insert into carta values(23, 10, "d_10", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Playing_card_diamond_10.svg/60px-Playing_card_diamond_10.svg.png", 0);
insert into carta values(24, 10, "d_j", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Playing_card_diamond_J.svg/60px-Playing_card_diamond_J.svg.png" ,0);
insert into carta values(25, 10, "d_q", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Playing_card_diamond_Q.svg/60px-Playing_card_diamond_Q.svg.png" ,0);
insert into carta values(26, 10, "d_k", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_K.svg/60px-Playing_card_diamond_K.svg.png" ,0);
insert into carta values(27, 1,	"c_as", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_heart_A.svg/60px-Playing_card_heart_A.svg.png" ,1);
insert into carta values(28, 2,	"c_2", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Playing_card_heart_2.svg/60px-Playing_card_heart_2.svg.png" ,0);
insert into carta values(29, 3,	"c_3", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Playing_card_heart_3.svg/60px-Playing_card_heart_3.svg.png" ,0);
insert into carta values(30, 4,	"c_4", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Playing_card_heart_4.svg/60px-Playing_card_heart_4.svg.png" ,0);
insert into carta values(31, 5,	"c_5", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_heart_5.svg/60px-Playing_card_heart_5.svg.png" ,0);
insert into carta values(32, 6,	"c_6", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/60px-Playing_card_heart_6.svg.png" ,0);
insert into carta values(33, 7,	"c_7", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_heart_7.svg/60px-Playing_card_heart_7.svg.png" ,0);
insert into carta values(34, 8,	"c_8", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_8.svg/60px-Playing_card_heart_8.svg.png" ,0);
insert into carta values(35, 9,	"c_9", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_9.svg/60px-Playing_card_heart_9.svg.png" ,0);
insert into carta values(36, 10, "c_10", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Playing_card_heart_10.svg/60px-Playing_card_heart_10.svg.png", 0);
insert into carta values(37, 10, "c_j", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Playing_card_heart_J.svg/60px-Playing_card_heart_J.svg.png", 0);
insert into carta values(38, 10, "c_q", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Playing_card_heart_Q.svg/60px-Playing_card_heart_Q.svg.png", 0);
insert into carta values(39, 10, "c_k", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Playing_card_heart_K.svg/60px-Playing_card_heart_K.svg.png", 0);
insert into carta values(40, 1,	"p_as", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/60px-Playing_card_spade_A.svg.png", 1);
insert into carta values(41, 2,	"p_2", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_spade_2.svg/60px-Playing_card_spade_2.svg.png", 0);
insert into carta values(42, 3,	"p_3", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_spade_3.svg/60px-Playing_card_spade_3.svg.png", 0);
insert into carta values(43, 4,	"p_4", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/60px-Playing_card_spade_4.svg.png", 0);
insert into carta values(44, 5,	"p_5", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/60px-Playing_card_spade_5.svg.png", 0);
insert into carta values(45, 6,	"p_6", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/60px-Playing_card_spade_6.svg.png", 0);
insert into carta values(46, 7,	"p_7", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Playing_card_spade_7.svg/60px-Playing_card_spade_7.svg.png", 0);
insert into carta values(47, 8,	"p_8", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Playing_card_spade_8.svg/60px-Playing_card_spade_8.svg.png", 0);
insert into carta values(48, 9,	"p_9", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/60px-Playing_card_spade_9.svg.png", 0);
insert into carta values(49, 10, "p_10", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/60px-Playing_card_spade_10.svg.png", 0);
insert into carta values(50, 10, "p_j", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Playing_card_spade_Q.svg/60px-Playing_card_spade_Q.svg.png" ,0);
insert into carta values(51, 10, "p_q", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Playing_card_spade_J.svg/60px-Playing_card_spade_J.svg.png" ,0);
insert into carta values(52, 10, "p_k", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Playing_card_spade_K.svg/60px-Playing_card_spade_K.svg.png" ,0);


select * from usuario;
select * from carta;
select * from jugada;
select * from partida;
select * from carta_jugada;