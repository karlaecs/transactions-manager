# Manager Transactions

# Database creation
$ sudo su - postgres

$ psql

$ create user manager password '123456' createdb login;

$ create database transactions owner = manager;

$ \q 

$ exit

# Running
./mvnw spring-boot:run
