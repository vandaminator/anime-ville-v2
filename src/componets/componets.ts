import { animeInfo, episodeItem, release_item, result_item } from "../api/api_types";



export class Pages {
  searchBar(): string {
    return `

    <div id="search-bar" >
        <label for="search-input">Search</label>
        <input type="text" name="search-input" id="search-input" >
    </div>

    `;
  }

  releaseComponet(htmltextItems: string): string {
    return `

    <section class="new-release">
    <input type="hidden" name="page-count" id="page-count" value="1" >
        <h1>New Release</h1>
        <div id="new-anime">
            ${htmltextItems}
        </div>
        <button id="more-release-btn" >More</button>
    </section>

    `;
  }

  releaseItem(newData: release_item): string {
    return `
    <div class="search-item">
        <div class="search-item-content">
            <img src="${newData.image}" alt="image" width="150" >
        </div>
        <a href="${newData.url}" >
            <h3 class="anime-title">${newData.title}-${newData.episodeNumber}</h3>
        </a>
    </div>
    `;
  }

  searchResults(htmlText: string): string {
    return `

    <section class="search-results">
    <input type="hidden" name="page-count" id="page-count" value="1" >
        <h1>Results</h1>
        <div id="anime-results">
          ${htmlText}
        </div>
        <button id="more-search-btn" >More</button>
    </section>

    `;
  }

  searchItem(Data: result_item): string {
    return `
    <div class="search-item" data-="${Data.id}" >
    <h3 class="anime-title">${Data.title}</h3>
      <div class="search-item-content">
        <img src="${Data.image}" alt="image" width="150" >
      </div>
    </div>
    `;
  }

  animeDetails(Data: animeInfo, genreHtmlText: string, episodeHtmlText: string): string {
    return `
    <section class="anime-details" >
        <h2>${Data.title}</h2>
        <div class="anime-image" >
            <img src="${Data.image}" alt="" >
        </div>
        <p class="info">Other names: ${Data.otherName}</p>
        <p class="info">Type: ${Data.type}</p>
        <p class="info">Released date: ${Data.releaseDate}</p>
        <p class="info">Status: ${Data.status}</p>
        <p class="info">Total Episodes: ${Data.totalEpisodes}</p>
        <div class="genres">
          ${genreHtmlText}
        </div>
        <p class="synopsis">${Data.description}</p>
        <div class="episodes">
          ${episodeHtmlText}
        </div>
    </section>
    `;
  }

  setGenre(name: string): string {
    return `<div class="genre-item" > ${name} </div> `;
  }

  setEpisode(data: episodeItem): string {
    return `
    <div class="ep-item" >
        <a href="${data.url}" > ${data.number} </a>
    </div>
    `;
  }
}
