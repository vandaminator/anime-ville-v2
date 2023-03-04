
class gogoanime {

    async searchAnime(name:string, page:number = 1): Promise<object> {
        const response =  await fetch(`https://api.consumet.org/anime/gogoanime/${name}?page=${page}`)
        return response.json()
    }

    async getRecentEpisosdes(page: number = 1): Promise<object> {
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/recent-episodes?page=${page}`)
        return response.json()
    }

    async getAnimeInfo (animeId: string) : Promise<object> {
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${animeId}`)
        return response.json()
    }
}

export { gogoanime }