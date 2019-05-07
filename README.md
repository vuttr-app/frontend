# VUTTR

Uma aplicação frontend para gerenciamento de ferramentas conforme [descrito em](https://www.notion.so/Front-end-c12adcdbe7a1425dbfbcd5a397b4ff10).

Criado com [vue-cli 3](https://cli.vuejs.org/).

A versão do vuejs utilizada pode ser observada no arquivo package.json do diretório app.

Além do diretório a aplicação (`app`) em si possui mais 2 submódulos:
1. `api`: incorpora os fontes [disponibilizados em](https://gitlab.com/bossabox/challenge-fake-api). Serve como backend da aplicação, uma vez que é critério de aceite do projeto. Assim sendo para atendê-lo o mesmo foi implantado em um ambiente na ferramenta [heroku](https://heroku.com), no [endereço](https://vuttr-rest-api.herokuapp.com/).
2. `e2e`: como o nome sugere guarda configurações necessárias para rodar testes de ponta-a-ponta para a aplicação em desenvolvimento. Utiliza [CucumberJS](https://cucumber.io/) e [Nightwatch-API](https://nightwatch-api.netlify.com/).

## Desenvolvimento

É necessário ter o [docker-compose](https://docs.docker.com/compose/) com suporte a versão `3.4` do arquivo de [configuração](https://docs.docker.com/compose/compose-file/).

### Iniciar ambiente
```bash
docker-compose -f dev.yml up -d
```
### Rodar testes unitários em modo watch
```
docker-compose -f dev.yml exec app /bin/sh -c 'yarn test:unit --watchAll'
```
### Rodar testes de ponta-a-ponta (firefox)
```
docker-compose -f dev.yml exec e2e /bin/sh -c 'npm run cucumber'
```
### Rodar testes de ponta-a-ponta (chrome)
```
docker-compose -f dev.yml exec e2e /bin/sh -c 'browser=chrome npm run cucumber'
```
### Acessar applicação via navegador

Caso deseje utilizar a aplicação enquando desenvolve (para fazer algum ajuste visual, por exemplo), acesse o endereço `http://localhost:4300`.

### Reinicializar a base da api

Caso deseje utilizar uma massa de dados diferente basta substituir/criar o arquivo `api/.db.json` naquele diretório. Lá também é possível encontrar o arquivo original `api/db.json`.

## Implantação

Uma vez finalizada a demanda no devido branch criado para tanto, basta realizar o merge do mesmo para o master e realizar o push para o repositório remoto. Essa ação irá disparar uma nova build no travisci, que se passar no crivo dos testes de lint, unitários e e2e publicará a nova versão no endereço (https://vuttr-app.github.io/). Pode-se confirmar que a nova versão foi publicada ao observar que o número da build do travisci consta do title da página publicada.
