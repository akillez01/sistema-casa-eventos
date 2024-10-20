document.getElementById('eventForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    let formData = new FormData();
    formData.append('nome', document.getElementById('eventName').value);
    formData.append('data', document.getElementById('eventDate').value);
    formData.append('imagem', document.getElementById('eventImage').files[0]); // Upload da imagem
    formData.append('video', document.getElementById('eventVideo').files[0]); // Upload do vídeo

    try {
        const response = await fetch('/eventos', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('message').textContent = "Evento cadastrado com sucesso!";
            exibirEvento(data);
        } else {
            document.getElementById('message').textContent = "Erro ao cadastrar o evento.";
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Função para exibir eventos e imagens cadastrados
function exibirEvento(evento) {
    const eventosList = document.getElementById('eventosList');
    const galleryContainer = document.getElementById('galleryContainer');
    const videoGalleryContainer = document.getElementById('videoGalleryContainer');

    // Criar um item de lista para o evento
    const li = document.createElement('li');
    li.textContent = `${evento.nome} - ${evento.data}`;

    // Criar botão de remoção
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.classList.add('remove-button');
    removeBtn.onclick = async () => {
        const response = await fetch(`/eventos/${evento.id}`, { method: 'DELETE' });
        if (response.ok) {
            li.remove(); // Remove o evento da lista
            // Remover a imagem e o vídeo da galeria
            if (evento.imagemUrl) {
                const imgToRemove = galleryContainer.querySelector(`img[src="${evento.imagemUrl}"]`);
                if (imgToRemove) imgToRemove.remove();
            }
            if (evento.videoUrl) {
                const videoToRemove = videoGalleryContainer.querySelector(`video[src="${evento.videoUrl}"]`);
                if (videoToRemove) videoToRemove.remove();
            }
        }
    };

    li.appendChild(removeBtn);
    eventosList.appendChild(li);

    // Exibir imagem se disponível
    if (evento.imagemUrl) {
        const img = document.createElement('img');
        img.src = evento.imagemUrl;
        img.alt = evento.nome;
        img.classList.add('gallery-image');
        galleryContainer.appendChild(img);
    }

    // Exibir vídeo se disponível
    if (evento.videoUrl) {
        const video = document.createElement('video');
        video.src = evento.videoUrl;
        video.controls = true; // Adiciona controles de reprodução
        video.classList.add('video-frame');
        videoGalleryContainer.appendChild(video);
    }
};

// Lógica para enviar e exibir comentários
document.getElementById('submitComment').addEventListener('click', function () {
    const comment = document.getElementById('comment').value;
    if (comment) {
        const commentsList = document.getElementById('commentsList');
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
        document.getElementById('comment').value = ''; // Limpar a caixa de comentário
    } else {
        alert("Por favor, digite um comentário.");
    }
});
