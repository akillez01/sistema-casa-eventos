# Sistema de Casa de Eventos

## Descrição
Este projeto é um sistema para gerenciamento de reservas, eventos e vendas de ingressos, utilizando Flask e Docker.

## Pré-requisitos
- Docker instalado
- Conta no Docker Hub

## Como Construir e Executar o Contêiner

### Construir a Imagem Docker
No diretório onde está o Dockerfile, execute o comando abaixo para construir a imagem Docker localmente:

```bash
docker build -t <seu_usuario_docker>/sistema-casa-eventos:versao .
```
**Exemplo:**
```bash
docker build -t seu_usuario_docker/sistema-casa-eventos:latest .
```

### Executar o Contêiner
Após construir a imagem, execute o contêiner:

```bash
docker run -d -p 5000:5000 <seu_usuario_docker>/sistema-casa-eventos:versao
```
**Exemplo:**
```bash
docker run -d -p 5000:5000 seu_usuario_docker/sistema-casa-eventos:latest
```

Agora, você pode acessar a aplicação no navegador:
```
http://localhost:5000
```

## Estrutura do Projeto
- `app.py`: Arquivo principal da aplicação Flask, que contém as rotas e a lógica de gerenciamento de eventos.
- `Dockerfile`: Arquivo de configuração para construção da imagem Docker.
- `requirements.txt`: Lista de dependências do projeto.

## Publicar a Imagem no Docker Hub

### Login no Docker Hub
Faça login no Docker Hub:

```bash
docker login
```
Insira seu nome de usuário e senha quando solicitado.

### Enviar a Imagem para o Docker Hub
Envie a imagem para o Docker Hub:

```bash
docker push <seu_usuario_docker>/sistema-casa-eventos:versao
```
**Exemplo:**
```bash
docker push seu_usuario_docker/sistema-casa-eventos:latest
```

### Verificar no Docker Hub
Acesse sua conta no Docker Hub e verifique se a imagem foi enviada com sucesso.

## Comandos Resumidos
- **Build da imagem:**
    ```bash
    docker build -t seu_usuario_docker/sistema-casa-eventos:latest .
    ```

- **Executar a imagem localmente:**
    ```bash
    docker run -d -p 5000:5000 seu_usuario_docker/sistema-casa-eventos:latest
    ```

- **Push da imagem para o Docker Hub:**
    ```bash
    docker push seu_usuario_docker/sistema-casa-eventos:latest
    ```

- **Pull da imagem (em outro ambiente):**
    ```bash
    docker pull seu_usuario_docker/sistema-casa-eventos:latest
    ```

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a MIT License - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
```

### Notas Adicionais
- Substitua `<seu_usuario_docker>` pelo seu nome de usuário do Docker Hub.
- Você pode adicionar mais informações, como instruções de como contribuir, informações sobre a licença, ou quaisquer outras seções relevantes para o seu projeto.
- Certifique-se de que o arquivo `requirements.txt` e o `Dockerfile` estejam devidamente configurados para que o projeto funcione conforme esperado. 



[
    {
        "data": "2024-02-14",
        "id": 1,
        "nome": "Musinorte1"
    }
]