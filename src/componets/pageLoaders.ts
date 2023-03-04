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
    private async newEpisodes (page: number = 1) {
        const data = await this.provider.getRecentEpisosdes(page);
        const EpisodeItems = data.results
        let htmlText: string = ``;
        for (let i = 0; i < EpisodeItems.length; i++) {
            let episode = EpisodeItems[i];

            htmlText += this.pages.releaseItem(episode);
        }
        return htmlText
        
    }

    async setRelease () {
        const newEpisodes = await this.newEpisodes()
        const page = this.pages.releaseComponet(newEpisodes)
        this.app.innerHTML = page
    }

    async moreRelease (page = 2) {
        const NEW_ANIME_CONTAINER = document.querySelector("#new-anime")!
        NEW_ANIME_CONTAINER.innerHTML += await this.newEpisodes(page)
    }


}

export { PageSetter }