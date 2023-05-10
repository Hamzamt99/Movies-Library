create table if not exists add_Movie(
    id serial primary key,
    title varchar(255),
    original_language varchar(255),
    original_title varchar(255),
    overview varchar(10000),
    comment varchar(1000)
);
