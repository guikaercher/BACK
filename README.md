1) Para instalar o projeto:
- Instalar Node.js versao 18 ou rodar o docker:
npm run docker OU docker-compose up --build
- Popular o banco de dados:
npm run migrations OU npx sequelize-cli db:migrate
2) Usar a API:
Para utilizar rodar o front consumindo o backend na porta 5000 (configurado automaticamente no docker)
OU
via Postman (se der tempo vou colocar a collection no repo ou criar um swagger)