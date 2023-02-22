1) Para instalar o projeto:
- Instalar Node.js versao 18 ou rodar o docker:
npm run docker OU docker-compose up --build
- Popular o banco de dados:
npm run migrations OU npx sequelize-cli db:migrate
2) Usar a API:
Para utilizar rodar o front consumindo o backend na porta 5000 (configurado automaticamente no docker)
OU
via Postman (se der tempo vou colocar a collection no repo ou criar um swagger)


Consideracoes 
1) Nao deu tempo de escrever todos os testes unitários.
2) Sobre o requisito 3, botei as variáveis no .env e criei um .env.template, porém fala em login/senha no env, mas o login e senha recebo via REST
3) Sobre o diferencial de usar typescript, tenho os conhecimentos, mas acabou nao dando tempo de converter, caso julguem necessário posso fazer uma segunda versao em TS
