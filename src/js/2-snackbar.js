import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delayValue = event.target.elements.delay.value;
  const stateValue = event.target.elements.state.value;
  getPromise(stateValue, delayValue)
    .then(value => {
      iziToast.show({
        class: 'iziToast-fulfilled',
        messageColor: '#fafafa',
        backgroundColor: '#32cd80',
        position: 'topRight',
        transitionIn: 'fadeIn',
        animateInside: false,
        progressBar: false,
        close: false,
        icon: ' ',
        message: value,
      });
    })
    .catch(error => {
      iziToast.error({
        class: 'iziToast-rejected',
        messageColor: '#fafafa',
        position: 'topRight',
        transitionIn: 'fadeIn',
        animateInside: false,
        progressBar: false,
        close: false,
        icon: ' ',
        backgroundColor: '#F04D2E',
        message: error,
      });
    });
  form.reset();
}

const getPromise = (state, delay) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(`Fulfilled promise in ${delay}ms`);
      } else {
        rej(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};
