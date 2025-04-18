/* replace PASSWORD 'xxxxxx' with your own password */

CREATE ROLE testuser WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';    

DROP DATABASE IF EXISTS mvc_app;
CREATE DATABASE mvc_app;

CREATE TABLE IF NOT EXISTS customerdata(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    explanation TEXT NOT NULL,
	image bytea,
	video bytea
);