import { AnswersBoard } from './components/Answers.Board'
import { SearchBar } from './components/Search.Bar'

function App() {
  return (
    <main className="flex flex-col bg-[url('/nfl.jpg')] bg-cover bg-blend-multiply h-screen bg-zinc-900 text-zinc-200 p-4 items-center">
      <img src="./nfld.png" className="h-48 w-48 my-4" />
      <SearchBar />
      <AnswersBoard />

      {/* <div className="grid grid-cols-6 gap-4 text-center">
        <span className="text-xs border-b border-zinc-600 py-2">
          Conference
        </span>
        <span className="text-xs border-b border-zinc-600 py-2">Division</span>
        <span className="text-xs border-b border-zinc-600 py-2">Team</span>
        <span className="text-xs border-b border-zinc-600 py-2">Position</span>
        <span className="text-xs border-b border-zinc-600 py-2">Drafted</span>
        <span className="text-xs border-b border-zinc-600 py-2">College</span>

        <span className="flex bg-green-600 h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400">
          AFC
        </span>
        <span className="flex bg-red-600 h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400">
          North
        </span>
        <span className="flex bg-red-600 h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400">
          CLE
        </span>
        <span className="flex bg-green-600 h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400">
          CB
        </span>
        <span className="flex bg-green-600 h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400">
          2018
        </span>
        <span className="flex bg-green-600 h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400">
          Ohio State
        </span>
      </div> */}
    </main>
  )
}

export default App
