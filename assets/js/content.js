// Função para reproduzir um episódio
function playEpisode(url, title) {
    const player = document.getElementById('player');
    if (player) {
        player.src = url;
        document.getElementById('episode-title').textContent = title;
        
        // Scroll para o player
        player.scrollIntoView({ behavior: 'smooth' });
    }
}