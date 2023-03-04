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
        const data = await this.provider.getRecentEpisosdes(page)
        let htmlText: string = ``;
        
    }


}

export { PageSetter }