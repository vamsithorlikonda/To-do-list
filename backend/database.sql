create database todo_list;
use todo_list;
create table toitems(
id int primary key auto_increment,
item_description varchar(100),
completed boolean default false
);

select * from toitems;

insert into toitems