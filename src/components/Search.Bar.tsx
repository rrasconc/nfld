import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBar() {
  return (
    <div className="flex flex-row rounded-lg w-full px-4 max-w-5xl border-2 focus-within:border-slate-200 border-zinc-600 items-center">
      <FontAwesomeIcon
        className="text-zinc-600 text-lg"
        icon={faMagnifyingGlass}
      />
      <input
        className="outline-none bg-zinc-800 rounded-md py-4 px-4 w-full"
        type="text"
      />
    </div>
  );
}
