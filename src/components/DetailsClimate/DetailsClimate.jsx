import { CardDetailClimate } from "../CardDetailClimate/CardDetailClimate";
import useWeatherCodeToEmoji from "../../hooks/useWeatherCode";
export function DetailsClimate({ coords, loading, error, data, units }) {
    const date = new Date();
    const temperature = Math.round(data?.temperature ?? 0);
    const sensation = Math.round(data?.sensation ?? 0);
    const humidity = Math.round(data?.humidity ?? 0);
    const wind = Math.round(data?.wind ?? 0);
    const precipitation = Math.round(data?.precipitation ?? 0);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(date);

    return (
        <section className="flex flex-col gap-4 flex-1">
            {!coords && (
                <section className="text-neutral-0 bg-neutral-800 w-full h-74 flex justify-center items-center mt-7 rounded-2xl">
                    <p>Getting Location...</p>
                </section>
            )}
            {loading && (
                <section className="text-neutral-0 bg-neutral-800 w-full h-74 flex flex-col justify-center items-center mt-7 rounded-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="20"
                        viewBox="0 0 60 20"
                        fill="currentColor"
                        className="text-neutral-0 mb-2"
                    >
                        <circle cx="10" cy="10" r="6" className="animate-wave-delay-1" />
                        <circle cx="30" cy="10" r="6" className="animate-wave-delay-2" />
                        <circle cx="50" cy="10" r="6" className="animate-wave-delay-3" />
                    </svg>
                    <p>Loading...</p>
                </section>
            )}
            {error && (
                <section className="text-neutral-0 bg-neutral-800 w-full h-74 flex justify-center items-center mt-7 rounded-2xl">
                    <p>Error getting location</p>
                </section>
            )}
            {data && !loading && coords && (
                <>
                    <section className="text-neutral-0 bg-[url(./assets/images/bg-today-small.svg)] sm:bg-[url(./assets/images/bg-today-large.svg)] bg-no-repeat bg-cover flex flex-col sm:flex-row justify-evenly sm:justify-between h-74 mt-7 rounded-2xl">
                        {coords && (
                            <>
                                <div className="flex flex-col items-center justify-center p-4 sm:items-start">
                                    <h3 className="text-3xl font-semibold mb-2">{data.city}, {data.country}</h3>
                                    <p className="font-light text-lg">{formattedDate}</p>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col items-center justify-center w-2/5">
                                        <img className="w-5/6" src={useWeatherCodeToEmoji(data.code)} alt="Climate_status" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-1/2">
                                        <h4 className="text-8xl italic font-semibold">{temperature}&deg;</h4>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                </>
            )}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <CardDetailClimate title={"Feels like"} value={sensation} unid={"°"} loading={loading} />
                <CardDetailClimate title={"Humidity"} value={humidity} unid={"%"} loading={loading} />
                <CardDetailClimate title={"Wind"} value={wind} unid={units.wind} loading={loading} />
                <CardDetailClimate title={"Precipitation"} value={precipitation} unid={units.precip} loading={loading} />
            </section>
        </section>
    );
}