# Projeto de Boletos

## Introdução
Este projeto é uma aplicação para gerenciar boletos, permitindo a importação de dados de boletos a partir de arquivos CSV e a geração de relatórios em PDF.


## Instalação
1. Clone o repositório.
   ```bash
   git clone git@github.com:alefwhite/desafio-tecnico-green-acesso.git
   cd desafio-tecnico-green-acesso
   ```
2. Navegue até o diretório do projeto.
3. Instale as dependências com `pnpm install`.

## Configuração do Ambiente
1. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```
2. O projeto utiliza o Prisma como ORM, com um banco de dados SQLite para armazenamento dos dados. Para criar e executar as migrações, utilize o comando:
   ```bash
   pnpm migrate:deploy
   ```

## Uso
Para iniciar o servidor, execute:
```bash
pnpm start
```

Para testar os endpoints, você pode usar o arquivo `routes.http` com uma extensão como o REST Client no VSCode.

## Rotas
- **Importar CSV**: `POST /boletos/import`
  - Use o arquivo de exemplo `boletos.csv` na pasta `files`.
- **Gerar PDF**: `GET /boletos?relatorio=1`
  - Gera um relatório em PDF dos boletos.
- **Obter Boletos**: `GET /boletos`
  - Filtros disponíveis: /boletos?nome=JOSE&valor_inicial=100&valor_final=200&id_lote=2
    - `nome`: Filtra boletos pelo nome do sacado.
    - `valorInicial`: Filtra boletos com valor maior ou igual ao especificado.
    - `valorFinal`: Filtra boletos com valor menor ou igual ao especificado.
    - `loteId`: Filtra boletos pelo ID do lote.

## Exemplos de Arquivos
Os arquivos de exemplo estão localizados na pasta `files`:
- `boletos.csv`: Exemplo de arquivo CSV para importação de boletos.
- `boletos.pdf`: Exemplo de relatório em PDF gerado.
- `Insomnia_2025-04-11`: Coleção de uso do Insomnia para testar os endpoints.

Certifique-se de que os arquivos de exemplo estão no formato correto antes de usá-los nas rotas correspondentes.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Fastify**: Framework web para criar o servidor e definir rotas.
- **Prisma**: ORM para interagir com o banco de dados.
- **PDFKit**: Biblioteca para gerar PDFs.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **PNPM**: Gerenciador de pacotes.
- **Convert CSV to JSON**: Biblioteca para converter arquivos CSV em JSON.
- **Dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.
- **Zod**: Biblioteca para validação de esquemas.
- **PDF-lib** e **PDF-parse**: Bibliotecas para manipulação de PDFs.
