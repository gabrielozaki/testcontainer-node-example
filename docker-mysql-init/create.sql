-- create database
create database example_database;

use example_database;

-- create table
CREATE TABLE example_table (
	id INT UNSIGNED NOT NULL,
	column1 VARCHAR(20) NOT NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id)
);

CREATE TABLE example_table2 (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_example_table1 INT UNSIGNED NOT NULL,
    column2 VARCHAR(20) NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (id),
    CONSTRAINT `fk_example_table1`
        FOREIGN KEY (id_example_table1) REFERENCES example_table (id)
);
