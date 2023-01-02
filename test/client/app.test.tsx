import { render } from "@testing-library/react"
import App from "../../src/client/app"

it("Should render our application", async () => {
  const dom = render(<App />)
  const wrapper = await dom.findByTestId("app-wrapper")
  expect(wrapper).toBeDefined()
})
