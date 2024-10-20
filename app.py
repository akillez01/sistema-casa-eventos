import os
from flask import Flask, jsonify, request, render_template, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Habilitar CORS para toda a aplicação

# Pasta onde as imagens e vídeos serão armazenados
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Armazenar eventos em uma lista (substitua por um banco de dados em produção)
eventos = []
id_counter = 1  # Contador para gerar IDs únicos

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/eventos', methods=['GET', 'POST'])
def manage_eventos():
    global id_counter
    if request.method == 'POST':
        nome = request.form.get('nome')
        data = request.form.get('data')
        imagem = request.files.get('imagem')
        video = request.files.get('video')

        if not nome or not data or not imagem:
            return jsonify({"error": "Nome, data e imagem são necessários."}), 400

        # Salvar a imagem
        filename = secure_filename(imagem.filename)
        imagem.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        imagem_url = url_for('static', filename=f'uploads/{filename}')

        # Salvar o vídeo se houver
        video_url = None
        if video:
            video_filename = secure_filename(video.filename)
            video.save(os.path.join(app.config['UPLOAD_FOLDER'], video_filename))
            video_url = url_for('static', filename=f'uploads/{video_filename}')

        evento = {
            "id": id_counter,
            "nome": nome,
            "data": data,
            "imagemUrl": imagem_url,
            "videoUrl": video_url
        }

        eventos.append(evento)
        id_counter += 1

        return jsonify(evento), 201

    # Se for GET, retornar a lista de eventos
    return jsonify(eventos)

@app.route('/eventos/<int:event_id>', methods=['DELETE'])
def remove_evento(event_id):
    global eventos
    eventos = [evento for evento in eventos if evento['id'] != event_id]
    return jsonify({"message": "Evento removido com sucesso!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
