import './style.css'
import { PageSetter } from './componets/pageLoaders'

// document.querySelector("#app")!.innerHTML = `

// <h1> Anime-Ville </h1

// `
const APP: HTMLDivElement = document.querySelector("#app")!
const SEARCH: HTMLInputElement = document.querySelector("#search-input")!

const setter = new PageSetter(APP, SEARCH)

setter.setRelease()
