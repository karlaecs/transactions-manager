Este projeto é uma versão inicial de um gerenciador de transações. Com o objetivo de cadatrar, listar as transações e mostrar o saldo total resultante.

**Autora**: Karla Elisabeth

**Email**: <karlla.ecs@gmail.com>

# Pré requisitos 
## Backend
Servidor API RESTful com Spring Boot, Java, PostgreSQL, JPA e Maven

* JDK 1.8 or later
* Maven 3.2+

#### Configurações do banco de dados
    $ sudo su - postgres
    $ psql
    $ create user manager password '123456' createdb login;
    $ create database transactions owner = manager;
    $ \q 
    $ exit`

#### Executar servidor
    ./mvnw spring-boot:run

Servidor ficará disponível em http://localhost:8080/api/

## Frontend
Aplicação em ReactJS, Redux, Antd e Yarn or NPM

* Node 8.16+
* Yarn 0.25+ or NPM 5.2+

Criar arquivo *.env* e adicionar a variável de ambiente:

    REACT_APP_BASE_URL=http://localhost:8080/api/

#### Executar aplicação
    npm i
    npm start
