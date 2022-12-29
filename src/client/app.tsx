import tw from "twin.macro"

export default function App() {
  return (
    <AppWrapper>
      <AppContainer>
        <h1>Your new app!</h1>
        <p>Built with NodeJS, ExpressJS, React, MongoDB and Typescript</p>
      </AppContainer>
    </AppWrapper>
  )
}

const AppWrapper = tw.div`w-screen min-h-screen flex flex-col items-center justify-center text-center`
const AppContainer = tw.div`w-fit h-fit flex flex-col items-center justify-center gap-1 bg-gray-300 rounded-xl px-10 py-7 text-gray-900`
