import { Input } from "../Input/Input";
export function Intro() {
    return (
        <section>
            <div className="px-5 py-8">
                <h1 className="text-6xl text-center text-neutral-0 font-bold">How's the sky looking today?</h1>
            </div>
            <div>
                <form action="#" className="flex flex-col gap-2">
                    <div className="bg-neutral-800 flex px-4 py-3 gap-2 rounded-lg">
                        <img src="./assets/images/icon-search.svg" alt="icon_search" />
                        <Input className={"w-full text-neutral-200 focus-visible:outline-none"} placeholder={"Search for a place..."}/>
                    </div>
                    <Input className={"bg-blue-500 p-3 w-full text-center text-neutral-0"} value={"Search"} />
                </form>
            </div>
        </section>
    );
}