import './assets/styles.scss'
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { AppState } from './context/app'

//* Setup React Root
const container = document.getElementById('app')
if (!container) throw new Error('Container not found')
const app = createElement(App)
const appState = createElement(AppState, {}, app)
const strict = createElement(StrictMode, {}, appState)
createRoot(container).render(strict)
