// Seleciona elementos do DOM
const eventForm = document.getElementById('eventForm');
const eventosList = document.getElementById('eventosList');
const messageDiv = document.getElementById('message');

// Adiciona um ouvinte de eventos para o formulário
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtém os valores dos inputs
    const nome = document.getElementById('eventName').value;
    const dataEvento = document.getElementById('eventDate').value; // Renomeado para evitar conflito

    // Faz uma requisição POST para registrar o evento
    try {
        const response = await fetch('/eventos', { // Remover o localhost para que funcione em produção
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, data: dataEvento }) // Usando a variável renomeada
        });

        if (!response.ok) {
            throw new Error('Erro ao registrar evento');
        }

        const responseData = await response.json(); // Renomeando para evitar conflito
        messageDiv.innerHTML = `<p style="color: green;">${responseData.message}</p>`;
        addEventToList(responseData); // Adiciona o evento à lista
        eventForm.reset(); // Limpa o formulário
    } catch (error) {
        messageDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

// Função para adicionar evento à lista na interface
function addEventToList(evento) {
    const li = document.createElement('li');
    li.textContent = `${evento.nome} - ${new Date(evento.data).toLocaleDateString()}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => {
        removeEvent(evento.id, li);
    };
    li.appendChild(removeButton);
    eventosList.appendChild(li);
}

// Função para remover evento
async function removeEvent(eventId, li) {
    try {
        const response = await fetch(`/eventos/${eventId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao remover evento');
        }

        eventosList.removeChild(li); // Remove o evento da lista
    } catch (error) {
        messageDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Função para carregar eventos existentes
async function loadEvents() {
    try {
        const response = await fetch('/eventos'); // Remover o localhost para que funcione em produção
        const eventos = await response.json();

        eventos.forEach(evento => {
            addEventToList(evento);
        });
    } catch (error) {
        messageDiv.innerHTML = `<p style="color: red;">Erro ao carregar eventos: ${error.message}</p>`;
    }
}

// Carrega eventos ao iniciar a aplicação
loadEvents();
