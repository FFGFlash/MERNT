import "./styles.scss"
import { StrictMode, createElement } from "react"
import { createRoot } from "react-dom/client"
import App from "./app"

//* Setup React Root
const container = document.getElementById("app")
if (!container) throw new Error("Container not found")
createRoot(container).render(createElement(StrictMode, {}, createElement(App)))
