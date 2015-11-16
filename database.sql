create database quaner;
use quaner;
create table users(
    id int(12) NOT NULL primary key auto_increment,
    sex varchar(5) DEFAULT 'unknown',
    age int(3) DEFAULT 1,
    city varchar(30),
    name varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    qq varchar(15),
    email varchar(50),
    tel varchar(20),
    status enum('publish', 'private', 'deleted') NOT NULL DEFAULT 'publish',
    created_at datetime NOT NULL,
    extra text,
    KEY created_at_idx (created_at),
    KEY status_idx (status),
    KEY id_idx (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table quan(
    id int(12) NOT NULL primary key auto_increment,
    name varchar(255),
    type varchar(20),
    status enum('publish', 'private', 'deleted') NOT NULL DEFAULT 'publish',
    introduce varchar(200),
    created_at datetime NOT NULL,
    creator_id int(12),
    KEY created_at_idx (created_at),
    KEY status_idx (status),
    KEY id_idx (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table quan_members(
    id int(12) NOT NULL primary key  auto_increment,
    quan_id int(12) NOT NULL,
    user_id int(12) NOT NULL,
    created_at datetime NOT NULL,
    status int(1) DEFAULT 1,
    KEY id_idx (id),
    KEY quan_id_idx (quan_id),
    KEY user_id_idx (user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table user_relatives(
    id int(12) NOT NULL primary key  auto_increment,
    friend_id int(12) NOT NULL,
    user_id int(12) NOT NULL,
    created_at datetime NOT NULL,
    status int(1) DEFAULT 1,
    KEY id_idx (id),
    KEY friend_id_idx (friend_id),
    KEY user_id_idx (user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

