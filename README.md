# heroku_utils

# Configurações via variáveis de ambiente

- `PORT` Porta por onde o webserver vai escutar. O heroku atribui essa variável automagicamente.

- `TELEGRAM_LOG_BOT` Token do bot do telegram que vai mandar as mensagens. Para obter:
    - Chame o [@botfather](t.me/botfather) para trocar umas ideias
    - `/newbot'
    - Segue o que o bot te pedir
    - Cola o token que ele te der na variável de ambiente
      
- `TELEGRAM_LOG_CHAT` Código do usuário que tem permissão de usar o bot, outras mensagens serão ignoradas. Para obter:
    - Tenha o token do bot
    - Manda alguma coisa para o bot que tu criou, qualquer coisa, pode ser até aquele `/start` que tu manda para ativar o bot 
    - Digite o seguinte no seu navegador trocando %% pelo token to bot
      https://api.telegram.org/bot%%/getUpdates
    - Ele te retornará um objeto JSON, procura nesse objeto que ele te retorna a mensagem que tu mandou. Nela tu segue na chave message, dai em from e então em id. Ou seja `message.from.id` para os íntimos com Javascript e basicamente qualquer linguagem que usa a mesma notação para acessar propriedades de objetos.
    - Cola esse número que vai ser positivo na variável de ambiente.
      
- `FIREBASE_AUTH` Objeto JSON de configuração do Firebase. Para obter:
    - Vá para o [console do firebase](https://console.firebase.google.com/)
    - Crie um aplicativo web
    - Coloque um nome qualquer para esse aplicativo
    - Ele vai te dar um código de exemplo
    - Copia o que está dentro das chaves da variável `firebaseConfig` com as chaves junto
    - Coloca as aspas nas chaves do objeto, se não fizer isso não será um JSON válido e vai dar erro
    - Esse valor tu configura para a variável de ambiente. Se quiser minificar pode sem problemas contanto que não perca os dados e a estrutura

A aplicação foi feita para ser executada via docker, para "compilar" realize o docker build do Dockerfile.

O ambiente de desenvolvimento pode ser configurado automaticamente usando a extensão `Remote - Containers` do VS Code.
