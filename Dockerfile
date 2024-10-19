# Use uma imagem base do Python
FROM python:3.9-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de requisitos e instale as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código da aplicação
COPY . .

# Defina variáveis de ambiente (se necessário)
ENV FLASK_APP=app.py

# Comando para iniciar a aplicação Flask
CMD ["flask", "run", "--host=0.0.0.0"]
