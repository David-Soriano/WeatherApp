import { CardDetailClimate } from "../CardDetailClimate/CardDetailClimate";
export function DetailsClimate() {
    return (
        <section className="flex flex-col gap-4">
            <section className="text-neutral-0 bg-[url(./assets/images/bg-today-small.svg)] bg-no-repeat bg-cover flex flex-col justify-evenly h-74 mt-7 rounded-2xl">
                <div className="flex flex-col items-center justify-center p-4">
                    <h3 className="text-3xl font-semibold mb-2">Berlin, Germany</h3>
                    <p className="font-light text-lg">Tuesday, Aug 5, 2025</p>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center justify-center w-2/5">
                        <img className="w-5/6" src="./assets/images/icon-sunny.webp" alt="Climate_status" />
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/2">
                        <h4 className="text-8xl italic font-semibold">68&deg;</h4>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-2 gap-4">
                <CardDetailClimate title={"Feels like"} value={"64"} unid={"°"}/>
                <CardDetailClimate title={"Humidity"} value={"46"} unid={"%"}/>
                <CardDetailClimate title={"Wind"} value={"9"} unid={" mph"}/>
                <CardDetailClimate title={"Precipitation"} value={"0"} unid={" in"}/>
            </section>
        </section>
    );
}