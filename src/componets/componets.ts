interface genericinfo {
  animeTitle: string;
  animeImg: string;
}

export interface newEpisode extends genericinfo {
  animeEp: number;
  animeUrl: string;
}

export interface searchAnimeitem extends genericinfo {
  animeId: string;
}

export interface episodeItem {
  url: string;
  number: number;
}

export interface animeData extends genericinfo {
  description: string;
  type: string;
  releaseDate: string;
  status: string;
  otherName: string;
  totalEpisodes: number;
}

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
        <h1>New Release</h1>
        <div class="new-anime">
            ${htmltextItems}
        </div>
        <button id="more-release-btn" >More</button>
    </section>

    `;
  }

  releaseItem(newData: newEpisode): string {
    return `
    <div class="search-item">
        <div class="search-item-content">
            <img src="${newData.animeImg}" alt="image" width="150" >
        </div>
        <a href="${newData.animeUrl} >
            <h3 class="anime-title">${newData.animeTitle}-${newData.animeEp}</h3>
        </a>
    </div>
    `;
  }

  searchResults(): string {
    return `

    <section class="search-results">
        <h1>Results</h1>
        <div class="anime-results"></div>
        <button id="more-search-btn" >More</button>
    </section>

    `;
  }

  searchItem(Data: searchAnimeitem): string {
    return `
    <div class="search-item" onclick="console.log("${Data.animeId}") >
        <div class="search-item-content">
            <img src="${Data.animeImg}" alt="image" width="150" >
        </div>
        <h3 class="anime-title">${Data.animeTitle}</h3>
    </div>
    `;
  }

  animeDetails(Data: animeData): string {
    return `
    <section class="anime-details" >
        <h2>${Data.animeTitle}</h2>
        <div class="anime-image" >
            <img src="${Data.animeImg}" alt="" >
        </div>
        <p class="info">Other names: ${Data.otherName}</p>
        <p class="info">Type: ${Data.type}</p>
        <p class="info">Released date: ${Data.releaseDate}</p>
        <p class="info">Status: ${Data.status}</p>
        <p class="info">Total Episodes: ${Data.totalEpisodes}</p>
        <div class="genres"></div>
        <p class="synopsis">${Data.description}</p>
        <div class="episodes"></div>
    </section>
    `;
  }

  setGenre(name: string): string {
    return `<div class="genre-item" > ${name} </div> `;
  }

  setEpisode(data: episodeItem): string {
    return `
    <div class="ep-item" >
        <a href="${data.url} > ${data.number} </a>
    </div>
    `;
  }
}
