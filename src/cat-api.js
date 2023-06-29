export function fetchBreeds() {
    return fetch(`https://api.thecatapi.com/v1/breeds/`)
        .then(response => response.json())
};


export function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.json())
}


