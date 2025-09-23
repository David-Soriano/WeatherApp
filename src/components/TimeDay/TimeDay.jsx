import Drizzle from '/assets/images/icon-drizzle.webp';
import Fog from '/assets/images/icon-fog.webp';
import Overcast from '/assets/images/icon-overcast.webp';
import PartlyCloudy from '/assets/images/icon-partly-cloudy.webp';
import Rain from '/assets/images/icon-rain.webp';
import Snow from '/assets/images/icon-snow.webp';
import Storm from '/assets/images/icon-storm.webp';
import Sunny from '/assets/images/icon-sunny.webp';
import Error from '/assets/images/icon-error.svg';
const weatherCodeToEmoji = (code) => {
    const map = {
        0: Sunny,
        1: PartlyCloudy,
        2: PartlyCloudy,
        3: Overcast,

        45: Fog,
        48: Fog,

        51: Drizzle,
        53: Drizzle,
        55: Drizzle,
        56: Drizzle, // freezing drizzle
        57: Drizzle, // freezing drizzle

        61: Rain,
        63: Rain,
        65: Rain,
        66: Rain, // freezing rain
        67: Rain,

        71: Snow,
        73: Snow,
        75: Snow,
        77: Snow,

        80: Drizzle, // light rain showers
        81: Rain,    // moderate showers
        82: Storm,   // violent showers

        85: Snow,
        86: Snow,

        95: Storm,
        96: Storm,
        99: Storm,
    };
    return map[code] ?? '❓';
};
export function TimeDay({ hour, error }) {

    if (!hour) {
        return (
            <article className="bg-neutral-700 border border-neutral-600 p-3 rounded-lg animate-pulse h-15">

            </article>
        );
    }
    if (error) {
        return (
            <article className="bg-neutral-700 border border-neutral-600 p-3 rounded-lg  h-15">

            </article>
        );
    }
    return (
        <article className="bg-neutral-700 border border-neutral-600 flex justify-between px-3 rounded-lg min-h-5">
            <section className="flex gap-2">
                <div className='w-1/5'>
                    <img src={weatherCodeToEmoji(hour.code)} alt="Icon_Climate" className='w-full' />
                </div>
                <div className='flex justify-center items-center'>
                    <p>{hour.time}</p>
                </div>
            </section>
            <div className='flex justify-center items-center'>
                <p className='text-sm font-light'>{hour.temp}°</p>
            </div>
        </article>
    );
}