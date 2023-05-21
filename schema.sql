create table if not exists add_Movie(
    id serial primary key,
    title varchar(255),
    poster_path varchar(255),
    release_date varchar(255),
    overview varchar(10000),
    comment varchar(1000)
);
