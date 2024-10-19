from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para toda a aplicação

# Armazenar eventos em uma lista (substitua por um banco de dados em produção)
eventos = []
id_counter = 1  # Contador para gerar IDs únicos

@app.route('/')
def home():
    return render_template('index.html')  # Renderize o template HTML

@app.route('/eventos', methods=['GET', 'POST'])
def manage_eventos():
    global id_counter
    if request.method == 'POST':
        data = request.json
        app.logger.info(f'Recebendo dados para cadastro: {data}')  # Log dos dados recebidos
        
        # Verificar se os dados necessários estão presentes
        if 'nome' not in data or 'data' not in data:
            app.logger.error('Dados faltando no cadastro.')
            return jsonify({"error": "Nome e data do evento são necessários."}), 400
        
        evento = {
            "id": id_counter,
            "nome": data['nome'],
            "data": data['data']
        }
        eventos.append(evento)
        id_counter += 1  # Incrementar o contador para o próximo evento
        app.logger.info(f'Evento cadastrado: {evento}')  # Log do evento cadastrado
        return jsonify(evento), 201  # Retornar o evento criado

    # Se for GET, retornar a lista de eventos
    return jsonify(eventos)

@app.route('/eventos/<int:event_id>', methods=['DELETE'])
def remove_evento(event_id):
    global eventos
    eventos = [evento for evento in eventos if evento['id'] != event_id]
    return jsonify({"message": "Evento removido com sucesso!"}), 200

if __name__ == '__main__':
    # Execute o Flask com host '0.0.0.0' para ser acessível de fora do contêiner
    app.run(debug=True, host='0.0.0.0', port=5000)
