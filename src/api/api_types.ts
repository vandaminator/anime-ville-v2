interface genericApi_Info {
    currentPage: number,
    hasNextPage: boolean,

}

interface genericApi_Item {
    id: string,
    title: string,
    image: string,
}





export interface result_item extends genericApi_Item  {
    releaseDate: string, // or null
    subOrDub: "sub" | "dub" // or "dub"
}

export interface search_info extends genericApi_Info  {
    results: result_item[]
}

export interface release_item extends genericApi_Item {
    episodeId: string,
    episodeNumber: number,
    url: string
}

export interface releaseInfo extends genericApi_Info  {
    results: release_item[]
}



export interface episodeItem {
    id: string,
    number: number,
    url: string
}

export interface animeInfo extends genericApi_Item {
  id: string,
  title: string,
  url: string,
  image: string,
  releaseDate: string, // or null
  description: string, // or null
  genres: string[],
  subOrDub: "sub" | 'dub',
  type: string, // or null
  status: string,
  otherName: string, // or null
  totalEpisodes: number,
  episodes: episodeItem[]
}

export {}