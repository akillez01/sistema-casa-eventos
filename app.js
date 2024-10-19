// Exemplo de função para adicionar evento à lista
function addEventToList(evento) {
    const eventosList = document.getElementById('eventosList');
    const li = document.createElement('li');
    li.textContent = `${evento.nome} - ${evento.data}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.classList.add('remove-button');
    
    removeButton.onclick = function() {
        eventosList.removeChild(li); // Remove o evento da lista
    };

    li.appendChild(removeButton);
    eventosList.appendChild(li);
}

// Exemplo de manipulação do formulário
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;

    fetch('http://127.0.0.1:5000/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: name, data: date })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = 'Evento cadastrado com sucesso!';
        addEventToList(data); // Adiciona o evento à lista
        document.getElementById('eventForm').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('message').innerText = 'Erro ao cadastrar evento.';
    });
});
