const track = document.querySelector('.carousel-track');
const images = Array.from(document.querySelectorAll('.carousel img'));
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const background = document.body;

let currentIndex = 1; 

const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, images[0]);

const allImages = Array.from(document.querySelectorAll('.carousel img'));

const backgroundColors = [
    '#1a1a1a', // Color for alien.jpg
    '#ff5733', // Color for babydriver.webp
    '#c70039', // Color for corra.webp
    '#900c3f', // Color for fantasma.webp
    '#581845', // Color for forma.webp
    '#34495e', // Color for metal.webp
    '#2ecc71', // Color for spetta.webp
    '#3498db'  // Color for star.jpg
];

const movieData = [
    {
        title: "Alien",
        description: "A tripulação da nave Nostromo enfrenta um alienígena mortal após investigar um sinal desconhecido em um planeta distante."
    },
    {
        title: "Em Ritmo de Fuga (Baby Driver)",
        description: "Baby, um jovem motorista talentoso, tenta abandonar sua vida criminosa ao se apaixonar, mas enfrenta desafios perigosos."
    },
    {
        title: "Corra!",
        description: "Chris, um jovem negro, descobre segredos perturbadores ao visitar a família de sua namorada branca."
    },
    {
        title: "O Fantasma da Ópera",
        description: "Um gênio musical desfigurado assombra a Ópera de Paris enquanto se apaixona por uma jovem cantora."
    },
    {
        title: "A Forma da Água",
        description: "Elisa, uma zeladora muda, forma um vínculo único com uma criatura aquática mantida em cativeiro em um laboratório secreto."
    },
    {
        title: "Metalhead",
        description: "Uma jovem encontra consolo no heavy metal após uma tragédia familiar em uma pequena cidade islandesa."
    },
    {
        title: "A Grande Beleza",
        description: "Jep Gambardella, um escritor e jornalista, reflete sobre sua vida e a beleza de Roma após seu aniversário de 65 anos."
    },
    {
        title: "Star Wars",
        description: "Luke Skywalker embarca em uma jornada épica para salvar a galáxia do Império Galáctico e descobrir seu destino como Jedi."
    }
];

function updateCarousel() {
    const width = allImages[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
}

function updateBackground() {
    background.style.transition = 'background-color 0.5s ease-in-out';
    background.style.backgroundColor = backgroundColors[currentIndex - 1];
}

function extractColors(image, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const topColor = ctx.getImageData(canvas.width / 2, canvas.height * 0.1, 1, 1).data;
    const middleColor = ctx.getImageData(canvas.width / 2, canvas.height * 0.5, 1, 1).data;
    const bottomColor = ctx.getImageData(canvas.width / 2, canvas.height * 0.9, 1, 1).data;

    callback({
        top: `rgb(${topColor[0]}, ${topColor[1]}, ${topColor[2]})`,
        middle: `rgb(${middleColor[0]}, ${middleColor[1]}, ${middleColor[2]})`,
        bottom: `rgb(${bottomColor[0]}, ${bottomColor[1]}, ${bottomColor[2]})`
    });
}

function updateBackgroundWithGradient() {
    const currentImage = allImages[currentIndex];
    const tempImage = new Image();
    tempImage.src = currentImage.src;

    tempImage.onload = () => {
        extractColors(tempImage, (colors) => {
            background.style.transition = 'background 0.5s ease-in-out';
            background.style.background = `linear-gradient(${colors.top}, ${colors.middle}, ${colors.bottom})`;
        });
    };
}

function updateMovieInfo() {
    const movie = movieData[currentIndex - 1];
    const titleElement = document.getElementById('movie-title');
    const descriptionElement = document.getElementById('movie-description');

    if (movie) {
        titleElement.textContent = movie.title;
        descriptionElement.textContent = movie.description;
    }
}

function moveToNext() {
    const width = allImages[0].clientWidth;
    currentIndex++;
    track.style.transition = 'transform 0.5s ease-in-out';
    updateCarousel();
    updateBackgroundWithGradient();
    updateMovieInfo();

    if (currentIndex === allImages.length - 1) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 1; // Reset to the first real image
            updateCarousel();
            updateBackgroundWithGradient();
            updateMovieInfo();
        }, 500);
    }
}

function moveToPrev() {
    const width = allImages[0].clientWidth;
    currentIndex--;
    track.style.transition = 'transform 0.5s ease-in-out';
    updateCarousel();
    updateBackgroundWithGradient();
    updateMovieInfo();

    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = allImages.length - 2; 
            updateCarousel();
            updateBackgroundWithGradient();
            updateMovieInfo();
        }, 500);
    }
}

nextButton.addEventListener('click', moveToNext);
prevButton.addEventListener('click', moveToPrev);

window.addEventListener('resize', updateCarousel);

window.addEventListener('load', () => {
    updateCarousel();
    updateBackgroundWithGradient();
    updateMovieInfo();
});
