export function DetailsClimate() {
    return (
        <section className="bg-[url(./assets/images/bg-today-small.svg)] bg-no-repeat bg-contain flex flex-col justify-evenly h-74 mt-7">
            <section className="text-neutral-0">
                <div className="flex flex-col items-center justify-center p-4">
                    <h3 className="text-3xl font-semibold mb-2">Berlin, Germany</h3>
                    <p className="font-light text-lg">Tuesday, Aug 5, 2025</p>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center justify-center w-1/2">
                        <img className="w-4/6" src="./assets/images/icon-sunny.webp" alt="Climate_status" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-8xl italic font-semibold">68&deg;</h4>
                    </div>
                </div>
            </section>
            <section>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </section>
        </section>
    );
}