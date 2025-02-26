document.addEventListener("DOMContentLoaded", function () {

  //анимация карточек
  function flipCard() {
    const cards = document.querySelectorAll('.product-card');
    for (let card of cards) {
      card.addEventListener('click', flipHandler);
    }
  }

  function removeFlipCard() {
    const cards = document.querySelectorAll('.product-card');
    for (let card of cards) {
      card.removeEventListener('click', flipHandler);
      card.classList.remove('flip');
    }
  }

  function flipHandler() {
    this.classList.toggle('flip');
  }

  function handleResize() {
    if (window.innerWidth < 768) {
      if (!window.flipInitialized) {
        flipCard();
        window.flipInitialized = true;
      }
    } else {
      if (window.flipInitialized) {
        removeFlipCard();
        window.flipInitialized = false;
      }
    }
  }

  handleResize();

  window.addEventListener('resize', handleResize);


  //СЧЕТЧИК
  setTimeout(() => {
    document.querySelectorAll(".counter__num img").forEach((img) => {
        const maxNum = parseInt(img.dataset.num, 10);
        let currentNum = 0; // Начинаем с 0
        const updateInterval = 300; // время смены 1 цифры

        function updateSrc() {
            img.src = `./img/numbers/${currentNum}.svg`;

            if (currentNum < maxNum) {
                currentNum++;
                setTimeout(updateSrc, updateInterval);
            }
        }

        updateSrc();
    });
}, 1000);//через какое время начинается анимация после загрузки
})