document.addEventListener("DOMContentLoaded", function () {

  //анимация карточек
  function flipCard() {
    const cards = document.querySelectorAll('.product-card');
    for (let card of cards) {
      card.addEventListener('click', flipHandler);
    }
  }

    const cards = document.querySelectorAll('.product-card');
    for (let card of cards) {
      const cardImage = card.querySelector('.product-card-front__img');
      const cardBack = card.querySelector('.product-card-back');
      cardImage.addEventListener('mouseenter', (e)=> {
          card.classList.add('flip');
      });
      cardBack.addEventListener('mouseleave', (e)=> {
          card.classList.remove('flip');
      });

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

//MODAL
const bodyEl = document.body;
const modalFramesOpen = document.querySelectorAll('[data-modal-button]');
const modalFrames = document.querySelectorAll('[data-modal]');

if (modalFrames.length > 0) {
  const modalFramesClose = document.querySelectorAll('[data-modal-close]');

  for (let item of modalFramesOpen) {
    item.addEventListener('click', function (e) {
      for (let item of modalFrames) {
        item.classList.add('hidden');
        bodyEl.classList.remove('noscroll');
      }
      e.preventDefault();
      const itemAttr = item.getAttribute('data-modal-button');
      const imageAttr = item.getAttribute('data-img');
      for (let frame of modalFrames) {
        const frameAttr = frame.getAttribute('data-modal');
        if (frameAttr == itemAttr) {
          frame.classList.remove('hidden');
          const frameImg = frame.querySelector('IMG');
          frameImg.setAttribute('src', imageAttr);
          bodyEl.classList.add('noscroll');
        }
      }
    });
  }
  /*==  закрыть модалки  frame-modal по клику на крестик ======*/
  for (let item of modalFramesClose) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      item.closest('[data-modal]').classList.add('hidden');
      bodyEl.classList.remove('noscroll');
    });
  }

  /*=============== закрыть модалки по клику вне ===============*/
  for (let frame of modalFrames) {
    const frameWin = frame.querySelector('.modal-window');
    frame.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
        e.preventDefault();
        frame.classList.add('hidden');
        bodyEl.classList.remove('noscroll');
      }
    });
  }
}
})