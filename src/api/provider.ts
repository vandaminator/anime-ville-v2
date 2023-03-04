interface genericApi_Info {
    currentPage: number,
    hasNextPage: boolean,

}

interface genericApi_Item {
    id: string,
    title: string,
    image: string,
}





interface result_item extends genericApi_Item  {
    releaseDate: string, // or null
    subOrDub: "sub" | "dub" // or "dub"
}

interface search_info extends genericApi_Info  {
    results: result_item[]
}

interface release_item {
    episodeId: string,
    episodeNumber: number,
    url: string
}

interface releaseInfo extends genericApi_Info  {
    results: release_item[]
}

class Gogoanime {

    async searchAnime(name:string, page:number = 1): Promise<search_info> {
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

export { Gogoanime }