import { useState } from "react";
import { Input } from "../Input/Input";
export function Intro() {
    const [textSearch, setTextSearch] = useState("");

    const controlSubmit = (e) => {
        e.preventDefault();
        ("Buscando", textSearch);
    }
    return (
        <section>
            <div className="px-5 py-8 sm:w-110 sm:m-auto lg:w-full">
                <h1 className="text-6xl text-center text-neutral-0 font-bold">How's the sky looking today?</h1>
            </div>
            <div>
                <form action="#" className="flex flex-col sm:flex-row gap-2 max-w-160 m-auto" onSubmit={controlSubmit}>
                    <div className="bg-neutral-800 flex px-4 py-3 gap-2 rounded-lg sm:w-full">
                        <img src="./assets/images/icon-search.svg" alt="icon_search" />
                        <Input className={"w-full text-neutral-200 focus-visible:outline-none"} placeholder={"Search for a place..."} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
                    </div>
                    <button className={"bg-blue-500 p-3 w-full sm:w-1/5 text-center text-neutral-0 rounded-lg cursor-pointer"} type="submit">Search</button>
                </form>
            </div>
        </section>
    );
}