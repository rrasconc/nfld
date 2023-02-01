const CATEGORIES = [
  'Conference',
  'Division',
  'Team',
  'Position',
  'Drafted',
  'College'
]

export function AnswersBoard() {
  return (
    <div className="w-full overflow-y-hidden overflow-x-scroll py-4">
      <div className="flex min-w-max flex-row text-xs gap-4">
        {CATEGORIES.map((item) => (
          <span className="w-16 border-b border-zinc-600 py-2 flex justify-center">
            {item}
          </span>
        ))}
      </div>
      <div className="flex min-w-max flex-row gap-4">
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
      </div>
    </div>
  )
}
