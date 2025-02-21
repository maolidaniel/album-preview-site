const musicData = {
  backInLove: {
    title: "Back In Love",
    audio: "./music/Daniel_Maoli_Back_in_Love.mp3",
    description: "Back In Love é sobre se apaixonar novamente por um amor antigo."
  },
  backToYou: {
    title: "Back To You",
    audio: "./music/Daniel_Maoli_Back_To_You.mp3",
    description: "Back To You fala sobre os sentimentos de um término de relacionamento e a vontade de querer reviver o que era bom dessa história."
  },
  amsterdam: {
    title: "Amsterdam",
    audio: "./music/Daniel_Maoli_Amsterdam.mp3",
    description: "Amsterdam é uma homenagem à cidade e à viagem feita com amigos. Criada de forma despretensiosa durante uma noite divertida, a música celebra a espontaneidade e os momentos inesquecíveis vividos lá."
  }
};

const photos = [
  { src: "./images/IMG_0792.JPG", story: "Tomorrowland Brasil 2023." },
  { src: "./images/IMG_1704.JPG", story: "Forfun - Turnê Nós - Allianz. Que noite!" },
  { src: "./images/IMG_1708.JPG", story: "Forfun - Turnê Nós - Allianz - Duran" },
  { src: "./images/IMG_0187.JPG", story: "Mais uma noite normal pela Augusta" },
  { src: "./images/IMG_9478.JPG", story: "Cheetos!!" },
  { src: "./images/IMG_2724.jpg", story: "Paris, Çava!!" },
  { src: "./images/IMG_3689.jpg", story: "Muito amor em Paris kkkkk" },
  { src: "./images/IMG_4138.jpg", story: "Primeira noite em Barcelona" },
  { src: "./images/IMG_4187.jpg", story: "Jogue o lixo no lixo. Barcelona, 2023." }
];

function showPlayer(musicKey) {
  const player = document.getElementById('player-container');
  const data = musicData[musicKey];

  // Seleção de imagem aleatória simplificada
  const randomIndex = Math.floor(Math.random() * photos.length);
  const randomPhoto = photos[randomIndex];

  document.getElementById('music-title').innerText = data.title;
  document.getElementById('audio-source').src = data.audio;
  document.getElementById('photo').src = randomPhoto.src;
  document.getElementById('photo').alt = "Imagem relacionada à " + data.title;
  document.getElementById('photo-story').innerText = randomPhoto.story;
  document.getElementById('music-description').innerText = data.description;
  document.getElementById('error-message').innerText = "";

  const audio = document.getElementById('audio-player');
  audio.load();

  audio.onerror = () => {
    document.getElementById('error-message').innerText = "Erro ao carregar o áudio. Verifique o caminho do arquivo ou o formato.";
  };

  player.style.display = 'block';
}

function closePlayer() {
  const playerContainer = document.getElementById('player-container');
  playerContainer.style.display = 'none';
  // Remover classe active de todos os itens de música
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => item.classList.remove('active'));

  // Remover classes de menu e player flutuantes e resetar o top do player
  const musicList = document.querySelector('.music-list');
  musicList.classList.remove('floating-menu');
  playerContainer.classList.remove('floating-player');
  playerContainer.style.top = "";

  // Remover placeholders se existirem
  const menuPlaceholder = document.getElementById('menu-placeholder');
  if (menuPlaceholder) menuPlaceholder.parentNode.removeChild(menuPlaceholder);
  const playerPlaceholder = document.getElementById('player-placeholder');
  if (playerPlaceholder) playerPlaceholder.parentNode.removeChild(playerPlaceholder);
}

function handleImageError() {
  const img = document.getElementById('photo');
  img.src = "https://via.placeholder.com/600x400?text=Imagem+Não+Dispon%C3%ADvel";
  document.getElementById('error-message').innerText = "Erro ao carregar a imagem. Verifique o caminho do arquivo ou o formato.";
}

document.addEventListener("DOMContentLoaded", function() {
  // Adicionar event listeners para os itens de música
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remover classe active de todos os itens
      musicItems.forEach(i => i.classList.remove('active'));
      // Adicionar classe active ao item clicado
      item.classList.add('active');

      const musicKey = item.getAttribute('data-music-key');
      showPlayer(musicKey);
    });
  });

  // Event listener para o botão fechar
  document.getElementById('close-player').addEventListener('click', closePlayer);

  // Event listener para erro na imagem
  const img = document.getElementById('photo');
  img.addEventListener('error', handleImageError);

  // Listener para scroll: torna o menu e o player flutuantes sem causar reposicionamento indesejado
  window.addEventListener('scroll', function() {
    const playerContainer = document.getElementById('player-container');
    const musicList = document.querySelector('.music-list');

    if (playerContainer.style.display === 'block') {
      if (playerContainer.getBoundingClientRect().top <= 0) {
        // Cria placeholders para preservar o espaço na página
        let menuPlaceholder = document.getElementById('menu-placeholder');
        if (!menuPlaceholder) {
          menuPlaceholder = document.createElement('div');
          menuPlaceholder.id = 'menu-placeholder';
          menuPlaceholder.style.height = musicList.offsetHeight + 'px';
          musicList.parentNode.insertBefore(menuPlaceholder, musicList);
        }
        let playerPlaceholder = document.getElementById('player-placeholder');
        if (!playerPlaceholder) {
          playerPlaceholder = document.createElement('div');
          playerPlaceholder.id = 'player-placeholder';
          playerPlaceholder.style.height = playerContainer.offsetHeight + 'px';
          playerContainer.parentNode.insertBefore(playerPlaceholder, playerContainer);
        }

        musicList.classList.add('floating-menu');
        playerContainer.classList.add('floating-player');
        // Posiciona o player logo abaixo do menu flutuante
        const menuHeight = musicList.offsetHeight;
        playerContainer.style.top = (20 + menuHeight + 20) + "px";
      } else {
        musicList.classList.remove('floating-menu');
        playerContainer.classList.remove('floating-player');
        playerContainer.style.top = "";
        // Remove os placeholders se existirem
        const menuPlaceholder = document.getElementById('menu-placeholder');
        if (menuPlaceholder) menuPlaceholder.parentNode.removeChild(menuPlaceholder);
        const playerPlaceholder = document.getElementById('player-placeholder');
        if (playerPlaceholder) playerPlaceholder.parentNode.removeChild(playerPlaceholder);
      }
    } else {
      musicList.classList.remove('floating-menu');
      playerContainer.classList.remove('floating-player');
      playerContainer.style.top = "";
      const menuPlaceholder = document.getElementById('menu-placeholder');
      if (menuPlaceholder) menuPlaceholder.parentNode.removeChild(menuPlaceholder);
      const playerPlaceholder = document.getElementById('player-placeholder');
      if (playerPlaceholder) playerPlaceholder.parentNode.removeChild(playerPlaceholder);
    }
  });
});
