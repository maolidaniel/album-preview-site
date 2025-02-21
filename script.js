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
  // Exibe o bloco da história da foto somente após o clique na música
  document.getElementById('photo-story').style.display = 'block';

  // Desce a página automaticamente até o final
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function closePlayer() {
  const player = document.getElementById('player-container');
  player.style.display = 'none';
  
  // Remove classe active de todos os itens de música
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => item.classList.remove('active'));
  
  // Remove o menu flutuante, se estiver ativo
  const musicList = document.querySelector('.music-list');
  musicList.classList.remove('floating-menu');
  
  // Oculta o bloco da história da foto
  document.getElementById('photo-story').style.display = 'none';

  // Remove o efeito flutuante da info, se ativo
  const musicInfo = document.getElementById('music-info');
  musicInfo.classList.remove('floating-info');
  musicInfo.style.top = "";
}

function handleImageError() {
  const img = document.getElementById('photo');
  img.src = "https://via.placeholder.com/600x400?text=Imagem+Não+Dispon%C3%ADvel";
  document.getElementById('error-message').innerText = "Erro ao carregar a imagem. Verifique o caminho do arquivo ou o formato.";
}

document.addEventListener("DOMContentLoaded", function() {
  // Configura os event listeners para os itens de música
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => {
    item.addEventListener('click', function() {
      musicItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const musicKey = item.getAttribute('data-music-key');
      showPlayer(musicKey);
    });
  });

  // Listener para o botão fechar
  document.getElementById('close-player').addEventListener('click', closePlayer);

  // Listener para erro na imagem
  document.getElementById('photo').addEventListener('error', handleImageError);

  // Listener para scroll: ajusta o menu flutuante e a informação flutuante
  window.addEventListener('scroll', function() {
    const player = document.getElementById('player-container');
    const musicList = document.querySelector('.music-list');
    const musicInfo = document.getElementById('music-info');
    if (player.style.display === 'block') {
      // Menu flutuante
      if (player.getBoundingClientRect().top <= 0) {
        musicList.classList.add('floating-menu');
      } else {
        musicList.classList.remove('floating-menu');
      }
      // Informação flutuante: se #music-info estiver fora da viewport (top < 0), flutua à direita, abaixo do bloco da história da foto
      if (musicInfo.getBoundingClientRect().top < 0) {
        musicInfo.classList.add('floating-info');
        const photoStory = document.getElementById('photo-story');
        musicInfo.style.top = (20 + photoStory.offsetHeight + 10) + "px";
      } else {
        musicInfo.classList.remove('floating-info');
        musicInfo.style.top = "";
      }
    } else {
      musicList.classList.remove('floating-menu');
      musicInfo.classList.remove('floating-info');
      musicInfo.style.top = "";
    }
  });
});
