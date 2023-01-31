import { useState } from "react";
import { SearchBar } from "./components/Search.Bar";

function App() {
  return (
    <main className="flex flex-col h-screen bg-zinc-800 text-slate-100 p-4 items-center justify-center">
      <SearchBar />
    </main>
  );
}

export default App;
