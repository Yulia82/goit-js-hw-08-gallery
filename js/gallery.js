import images from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');

// функция создает галерею картинок
function createCardImg(images) {
  return images.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
      </li>
  `}).join('');
}

galleryRef.insertAdjacentHTML('beforeend', createCardImg(images));

const modalWindowRef = document.querySelector('.js-lightbox');
const btnClose = document.querySelector('[data-action="close-lightbox"]');
const imgLightboxRef = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');
const linkRef = document.querySelectorAll('.gallery__link');
 
galleryRef.addEventListener('click', onClickCard);
btnClose.addEventListener('click', closeModal);
overlayRef.addEventListener('click', onClickOverlay);

const arrayLinkRef = [...linkRef];
const linkRefLength = arrayLinkRef.length;
let indexEl = 0;

function onClickCard(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  };

  openModal();

  imgLightboxRef.src = event.target.dataset.source;
  imgLightboxRef.alt = event.target.alt;
  // получаю индекс текущего элемента
  indexEl = arrayLinkRef.indexOf(event.target.closest('.gallery__link'));
};

// функция открывает модальное окно и вешает слушатель на клавиатуру
function openModal() {
  modalWindowRef.classList.toggle('is-open');
  window.addEventListener('keydown', onPressKey);
};

// функция закрывает модальное окно и снимает слушатель с клавиатуры
function closeModal() {
  modalWindowRef.classList.remove('is-open');
  imgLightboxRef.src = '';
  imgLightboxRef.alt = '';
  window.removeEventListener('keydown', onPressKey);
};

function onClickOverlay(evt) {
  if (!evt.currentTarget.classList.contains('lightbox__overlay')) {
    return;
  };

  closeModal();
};

function onPressKey(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  };

  // перелистывание при нажатии ArrowRight
  if (evt.code === 'ArrowRight' &&  indexEl < linkRefLength - 1) {
     imgLightboxRef.src = arrayLinkRef[indexEl + 1].href;
     indexEl += 1;
  };

  // перелистывание при нажатии ArrowLeft
   if (evt.code === 'ArrowLeft' &&  indexEl > 0) {
     imgLightboxRef.src = arrayLinkRef[indexEl - 1].href;
     indexEl -= 1;
  };
};
