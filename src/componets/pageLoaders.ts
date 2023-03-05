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
    private async newEpisodes (page: number = 1): Promise<[string, boolean]> {
        const data = await this.provider.getRecentEpisosdes(page);
        const hasNext = data.hasNextPage
        const EpisodeItems = data.results
        let htmlText: string = ``;
        for (let i = 0; i < EpisodeItems.length; i++) {
            let episode = EpisodeItems[i];

            htmlText += this.pages.releaseItem(episode);
        }
        return [htmlText ,hasNext]
        
    }

    checkDisableBtn (hasNext: boolean, buttonId: string) {
        if (!hasNext) {
            const button: HTMLButtonElement = document.querySelector(`#${buttonId}`)!
            button.disabled = true;
        }
    }

    async setRelease (): Promise<void> {
        const newEpisodes = await this.newEpisodes()
        const htmlText: string = newEpisodes[0];
        const hasNext = newEpisodes[1];
        
        const page = this.pages.releaseComponet(htmlText)
        this.app.innerHTML = page
        document.getElementById("more-release-btn")!.addEventListener("click", () => {
            this.moreRelease()
        })
        this.checkDisableBtn(hasNext, 'more-release-btn')
    }

    async moreRelease (): Promise<void> {
        const NEW_ANIME_CONTAINER = document.querySelector("#new-anime")!
        const pageCountInputElement: HTMLInputElement  = document.querySelector("#page-count")!
        const number = parseInt(pageCountInputElement.value) + 1
        pageCountInputElement.value = number.toString()
        const newEpisodes = await this.newEpisodes(number)
        const htmlText: string = newEpisodes[0];
        const hasNext = newEpisodes[1];
        NEW_ANIME_CONTAINER.innerHTML += htmlText
        this.checkDisableBtn(hasNext, 'more-release-btn')
    }

    private async animeResults (page: number = 1) : Promise<[string, boolean]> {
        const input = this.search_bar.value
        const data = await this.provider.searchAnime(input, page);
        const hasNext = data.hasNextPage
        const animeSearchResults = data.results
        let htmlText: string = ``;
        for (let i = 0; i < animeSearchResults.length; i++) {
            let anime = animeSearchResults[i];

            htmlText += this.pages.searchItem(anime);
        }
        return [htmlText, hasNext]
        
    }

    makeFunctionAnimeInfo() {
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

    async setSearchResults (): Promise<void> {
        const newEpisodes = await this.animeResults()
        const htmlText: string = newEpisodes[0];
        const hasNext = newEpisodes[1];
        const page = this.pages.searchResults(htmlText)
        
        this.app.innerHTML = page
        this.makeFunctionAnimeInfo()
        document.getElementById("more-search-btn")!.addEventListener("click", () => {
            this.moreSearchResults()
        })
        this.checkDisableBtn(hasNext, 'more-search-btn')
        
    }

    async moreSearchResults (): Promise<void> {
        const ANIME_RESULTS_CONTAINER = document.querySelector("#anime-results")!
        const pageCountInputElement: HTMLInputElement  = document.querySelector("#page-count")!
        const number = parseInt(pageCountInputElement.value) + 1
        pageCountInputElement.value = number.toString()
        const newEpisodes = await this.animeResults(number)
        const htmlText: string = newEpisodes[0];
        const hasNext = newEpisodes[1];
        ANIME_RESULTS_CONTAINER.innerHTML += htmlText
        this.makeFunctionAnimeInfo()
        this.checkDisableBtn(hasNext, "more-search-btn")
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