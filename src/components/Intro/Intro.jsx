import { useState } from "react";
import { Input } from "../Input/Input";
import { fetchCity } from "../../services/wheatherApi";
export function Intro({ setCoords }) {
    const [textSearch, setTextSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const controlSubmit = async (e) => {
        e.preventDefault();
        if (!textSearch.trim()) return;
        setLoading(true);
        setOpen(true);
        try {
            const data = await fetchCity(textSearch);
            setResults(data.results || []);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    const handleSelect = (city) => {
        setCoords({ latitude: city.latitude, longitude: city.longitude });
        setTextSearch(`${city.name}, ${city.country}`);
        setResults([]);
    };

    const onChange = (e) => {
        setTextSearch(e.target.value);
        setResults([]);
        setOpen(false)
    }

    return (
        <section>
            <div className="px-5 py-8 sm:w-110 sm:m-auto lg:w-full">
                <h1 className="text-6xl text-center text-neutral-0 font-bold">How's the sky looking today?</h1>
            </div>
            <div className="max-w-160 m-auto">
                <form action="#" className="flex flex-col sm:flex-row gap-2 " onSubmit={controlSubmit}>
                    <div className="bg-neutral-800 flex px-4 py-3 gap-2 rounded-lg relative border border-transparent focus-within:ring-2 focus-within:ring-neutral-0 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:w-full">
                        <img src="./assets/images/icon-search.svg" alt="icon_search" />
                        <Input className={"w-full text-neutral-200 focus-visible:outline-none inp-search"} type={'search'} placeholder={"Search for a place..."} value={textSearch} onChange={(e) => onChange(e)} />
                        {open > 0 && (
                            <div className="bg-neutral-800 rounded-lg mt-12 p-2 w-full absolute z-10 left-0">
                                {loading ? (
                                    <article className="flex">
                                        <img className="animate-spin" src="assets/images/icon-loading.svg" alt="Icon-Loading" />
                                        <p className="text-neutral-0 p-2">Search in progress</p>
                                    </article>
                                ) : (
                                    <ul>
                                        {results.length > 0 ? (results.map((city) => (
                                            <li
                                                key={city.id}
                                                className="text-neutral-0 border border-transparent hover:bg-neutral-700 hover:border hover:border-neutral-600 p-2 rounded-lg cursor-pointer"
                                                onClick={() => handleSelect(city)}
                                            >
                                                {city.name}, {city.country}
                                            </li>
                                        ))) : (<li className="text-neutral-400 p-2">No search result found!</li>)}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                    <button className="bg-blue-500 p-3 w-full sm:w-1/5 text-center text-neutral-0 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition " type="submit">Search</button>
                </form>

            </div>
        </section>
    );
}