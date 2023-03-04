import { search_info, releaseInfo, animeInfo } from "./api_types"

class Gogoanime {

    async searchAnime(name:string, page:number = 1): Promise<search_info> {
        const response =  await fetch(`https://api.consumet.org/anime/gogoanime/${name}?page=${page}`)
        return response.json()
    }

    async getRecentEpisosdes(page: number = 1): Promise<releaseInfo> {
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/recent-episodes?page=${page}`)
        return response.json()
    }

    async getAnimeInfo (animeId: string) : Promise<animeInfo> {
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${animeId}`)
        return response.json()
    }
}

export { Gogoanime }