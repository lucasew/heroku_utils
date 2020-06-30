# heroku_utils

# Configurações via variáveis de ambiente

- `PORT` Porta por onde o webserver vai escutar
- `TELEGRAM_LOG_BOT` Token do bot do telegram que vai mandar as mensagens
- `TELEGRAM_LOG_CHAT` Código do usuário que tem permissão de usar o bot, outras mensagens serão ignoradas. 

A aplicação foi feita para ser executada via docker, para "compilar" realize o docker build do Dockerfile.

O ambiente de desenvolvimento pode ser configurado automaticamente usando a extensão `Remote - Containers` do VS Code.
