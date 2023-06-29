import Notiflix from 'notiflix';
import axios from "../node_modules/axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";


const myKey = 'live_mMsmNUe8iWgtTSa0xA1PFKzit0Xodst3H6GPa8AjE12XrNuu3MyclG9i53Yv31ty';
axios.defaults.headers.common["x-api-key"] = myKey;

let catId = null;

const selectionEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

selectionEl.addEventListener('change', handleChangeEvent);

fetchBreeds()
    .then(breeds => {
        renderingVariates(breeds);
        loaderEl.classList.add('is-hidden');
        selectionEl.classList.remove('is-hidden');
    })
    .catch(error => Notiflix.Notify.failure('Qui timide rogat docet negare'));

function handleChangeEvent(e) {
    loaderEl.classList.remove('is-hidden');
    catInfoEl.innerHTML = '';
    catId = e.target.value;
    fetchCatByBreed(catId)
        .then(cat => {
                catInfoEl.insertAdjacentHTML('afterbegin', renderingCatImg(cat))
        })
        .catch(error => Notiflix.Notify.failure('Qui timide rogat docet negare'))
        .finally(() => {
            loaderEl.classList.add('is-hidden')
        })
    fetchBreeds()
        .then(cats => {
            const correctCat = cats.find(cat => cat.id === catId);
            catInfoEl.insertAdjacentHTML('beforeend', renderingCatIfo(correctCat));
        })
        .catch(error => Notiflix.Notify.failure('Qui timide rogat docet negare'));
}

function renderingVariates(breeds) {
    const catsArray = breeds.map(breed =>
        `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
    selectionEl.insertAdjacentHTML('beforeend', catsArray);
}

function renderingCatImg(cat) {
    return `<img src='${cat[0].url}'>`
    
}

function renderingCatIfo(cat) {
    return `<div class='cat-item'>
        <h1>${cat.name}</h1>
        <p>${cat.description}</p>
        <p><strong>Temperament: </strong> ${cat.temperament}</p>
    </div>`;
}





