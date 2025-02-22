let slideshowInterval = null;
let currentPhotoIndex = 0;

const musicData = {
  backInLove: {
    title: "Back In Love",
    audio: "./music/Daniel_Maoli_Back_in_Love.mp3",
    description: "Back In Love é uma música sobre a beleza e a vulnerabilidade de se apaixonar novamente. Com uma mistura de leveza e sinceridade, ela explora aquele momento de dúvida e esperança ao se reconectar com alguém especial. Entre questionamentos e confissões, a canção transmite o desejo de reviver sentimentos intensos, como se estivesse caminhando por uma rua romântica em Paris, buscando a certeza de que o amor ainda está lá."
  },
  backToYou: {
    title: "Back To You",
    audio: "./music/Daniel_Maoli_Back_To_You.mp3",
    description: "Back To You fala sobre os sentimentos de um término de relacionamento e a vontade de querer reviver o que era bom dessa história. A música narra a história de alguém que terminou uma relação, mas carrega o peso da decisão e o medo de não ter feito a melhor escolha. Em meio a lembranças e incertezas, a canção reflete sobre arrependimento, saudade e a esperança de reviver uma história que não terminou como deveria."
  },
  amsterdam: {
    title: "Amsterdam",
    audio: "./music/Daniel_Maoli_Amsterdam.mp3",
    description: "Amsterdam é uma celebração da liberdade, da amizade e das aventuras inesperadas em uma cidade cheia de histórias. Criada em uma madrugada despreocupada entre amigos durante uma viagem para Amsterdam, a música capta o clima leve e caótico de noites sem hora para acabar — entre ruas de paralelepípedos, canais iluminados e a energia vibrante que só Amsterdam tem. Com uma mistura de euforia e nostalgia, ela retrata aqueles momentos em que o tempo parece parar, e tudo o que importa é se perder na cidade e viver intensamente o agora."
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
  { src: "./images/IMG_4187.jpg", story: "Jogue o lixo no lixo. Barcelona, 2023." },
  { src: "./images/Maceio02.JPG", story: "Com meu pai em Maceió - Julho de 2023." },
  { src: "./images/VoAnna.JPG", story: "Com a minha vó Anna, minha irmã Julia e minha prima Dani. Uma última visita." },
  { src: "./images/Lolla01.JPG", story: "Lollapalooza 2023 - O início do mês Skrillex. Fui muito feliz!" },
  { src: "./images/BirthMay01.JPG", story: "Comemorando 28 anos daquele jeitinho." },
  { src: "./images/Maceio01.JPG", story: "Com meu irmão Rafa em Maceió, Julho de 2023." },
  { src: "./images/Amsterdam03.jpg", story: "Martin Garrix, cade você?" },
  { src: "./images/Amsterdam04.jpg", story: "Com o Mochakk - Amsterdam - ADE 2023." },
  { src: "./images/Amsterdam05.jpg", story: "Uma noite muito engraçada em Amsterdam." },
  { src: "./images/Amsterdam06.jpg", story: "Procurando a Pomba Holandesa." },
  { src: "./images/Tomorrow01.jpg", story: "Três!! Tomorrowland Brasil 2023 e uma resenha incrível de fim de rolê." },
  { src: "./images/Paris01.jpg", story: "20 anos não são 20 dias. Paris, Outubro de 2023." },
  { src: "./images/Amsterdam01.jpg", story: "We found love here in Amsterdam." },
  { src: "./images/Amsterdam02.jpg", story: "Coffeeshops and hidden gems - Amsterdam 2023" },
  { src: "./images/Barcelona01.jpg", story: "Barcelona x Real Madrid. Sonho de infância!" },
  { src: "./images/Barcelona02.jpg", story: "Despedida de Barcelona e fim de viagem." }
];

function updatePhoto() {
  const photo = document.getElementById('photo');
  const photoStory = document.getElementById('photo-story');
  const currentPhoto = photos[currentPhotoIndex];
  photo.src = currentPhoto.src;
  photo.alt = "Imagem relacionada à " + document.getElementById('music-title').innerText;
  photoStory.innerText = currentPhoto.story;
}

function showPlayer(musicKey) {
  const player = document.getElementById('player-container');
  const data = musicData[musicKey];

  document.getElementById('music-title').innerText = data.title;
  document.getElementById('audio-source').src = data.audio;
  document.getElementById('music-description').innerText = data.description;
  document.getElementById('error-message').innerText = "";

  const audio = document.getElementById('audio-player');
  audio.load();
  audio.onerror = () => {
    document.getElementById('error-message').innerText = "Erro ao carregar o áudio. Verifique o caminho do arquivo ou o formato.";
  };

  player.style.display = 'block';

  // Limpa qualquer slideshow já existente
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }

  // Inicia o slideshow com uma foto aleatória
  currentPhotoIndex = Math.floor(Math.random() * photos.length);
  updatePhoto();

  slideshowInterval = setInterval(() => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updatePhoto();
  }, 6000);

  // Exibe o bloco de história da foto (no rodapé)
  document.getElementById('photo-story').style.display = 'block';

  // Desce a página automaticamente até o final
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function closePlayer() {
  document.getElementById('player-container').style.display = 'none';
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => item.classList.remove('active'));
  document.querySelector('.music-list').classList.remove('floating-menu');
  document.getElementById('photo-story').style.display = 'none';

  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}

function handleImageError() {
  const img = document.getElementById('photo');
  img.src = "https://via.placeholder.com/600x400?text=Imagem+Não+Dispon%C3%ADvel";
  document.getElementById('error-message').innerText = "Erro ao carregar o áudio. Verifique o caminho do arquivo ou o formato.";
}

document.addEventListener("DOMContentLoaded", function() {
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => {
    item.addEventListener('click', function() {
      musicItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const musicKey = item.getAttribute('data-music-key');
      showPlayer(musicKey);
    });
  });

  document.getElementById('close-player').addEventListener('click', closePlayer);
  document.getElementById('photo').addEventListener('error', handleImageError);

  window.addEventListener('scroll', function() {
    const player = document.getElementById('player-container');
    const musicList = document.querySelector('.music-list');
    const musicDescription = document.getElementById('music-description');

    // Ajusta o menu flutuante
    if (player.style.display === 'block') {
      if (player.getBoundingClientRect().top <= 0) {
        musicList.classList.add('floating-menu');
      } else {
        musicList.classList.remove('floating-menu');
      }
    } else {
      musicList.classList.remove('floating-menu');
    }

    // Se a descrição da música estiver acima de 20px do topo, a fixa no canto superior direito
    if (player.style.display === 'block') {
      if (musicDescription.getBoundingClientRect().top < 20) {
        musicDescription.classList.add('floating-music-description');
      } else {
        musicDescription.classList.remove('floating-music-description');
      }
    } else {
      musicDescription.classList.remove('floating-music-description');
    }
  });
});
