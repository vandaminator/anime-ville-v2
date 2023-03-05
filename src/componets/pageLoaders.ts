import { Gogoanime } from "../api/provider"
import { Pages } from "./componets"


class PageSetter {

    provider = new Gogoanime()
    pages = new Pages()

    constructor (
        private app: HTMLDivElement,
        private search_bar: HTMLInputElement
    ) {}

    // generate text for all the epsodes
    private async newEpisodes (page: number = 1): Promise<string> {
        const data = await this.provider.getRecentEpisosdes(page);
        const EpisodeItems = data.results
        let htmlText: string = ``;
        for (let i = 0; i < EpisodeItems.length; i++) {
            let episode = EpisodeItems[i];

            htmlText += this.pages.releaseItem(episode);
        }
        return htmlText
        
    }

    async setRelease (): Promise<void> {
        const newEpisodes = await this.newEpisodes()
        const page = this.pages.releaseComponet(newEpisodes)
        this.app.innerHTML = page
    }

    async moreRelease (page = 2): Promise<void> {
        const NEW_ANIME_CONTAINER = document.querySelector("#new-anime")!
        NEW_ANIME_CONTAINER.innerHTML += await this.newEpisodes(page)
    }

    private async animeResults (page: number = 1) : Promise<string> {
        const input = this.search_bar.value
        const data = await this.provider.searchAnime(input, page);
        const animeSearchResults = data.results
        let htmlText: string = ``;
        for (let i = 0; i < animeSearchResults.length; i++) {
            let anime = animeSearchResults[i];

            htmlText += this.pages.searchItem(anime);
        }
        return htmlText
        
    }

    async setSearchResults (): Promise<void> {
        const newEpisodes = await this.animeResults()
        const page = this.pages.searchResults(newEpisodes)
        this.app.innerHTML = page
        const items =  document.querySelectorAll(".search-item")
        items.forEach(searchItem => {
            const a = searchItem.attributes
            searchItem.addEventListener("click", () => {
                const id = a.getNamedItem('data-')?.nodeValue
                if (typeof id == "string") {
                    this.setAnimeInfo(id)
                };
            })
        })
    }

    async moreSearchResults (page: number = 2): Promise<void> {
        const ANIME_RESULTS_CONTAINER = document.querySelector("#anime-results")!
        ANIME_RESULTS_CONTAINER.innerHTML += await this.animeResults(page)
    }

    async genresResult (animeId: string): Promise<string> {
        const data = await this.provider.getAnimeInfo(animeId)
        const genres = data.genres
        let htmlText: string = ``;
        for (let i = 0; i < genres.length; i++) {
            let genre = genres[i];
            htmlText += this.pages.setGenre(genre);
            }
        return htmlText
    }

    async episodeResult (animeId: string): Promise<string> {
        const data = await this.provider.getAnimeInfo(animeId)
        const episodes = data.episodes
        let htmlText: string = ``;
        for (let i = 0; i < episodes.length; i++) {
            let episode = episodes[i];
            htmlText += this.pages.setEpisode(episode);
        }
        return htmlText
    }

    async setAnimeInfo (animeId: string) : Promise<void> {
        const data = await this.provider.getAnimeInfo(animeId)
        const genres  = data.genres
        const episodes = data.episodes
        let genreHtmlText = ``
        let episodeHtmlText = ``
        genres.forEach(genre => {
            genreHtmlText += this.pages.setGenre(genre)
        })
        episodes.forEach(episode => {
            episodeHtmlText += this.pages.setEpisode(episode)
        })
        const AnimeInfoText = this.pages.animeDetails(data, genreHtmlText, episodeHtmlText)
        this.app.innerHTML = AnimeInfoText
    }

}

export { PageSetter }