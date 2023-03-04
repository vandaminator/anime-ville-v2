import './style.css'
import { Gogoanime } from './api/provider';

// document.querySelector("#app")!.innerHTML = `

// <h1> Anime-Ville </h1

// `

async function stuff () {
  try {
    const response = await fetch("https://api.consumet.org/anime/gogoanime/recent-episodes?page=2", {
      method: 'GET',
      headers: {}
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
}

stuff()

const anime = new Gogoanime()

anime.searchAnime("naruto")
  .then(info => console.log(info))


