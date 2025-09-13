import { getDayNameISO } from '../../utils/dates';

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

export default function DayCard({ day, error }) {
  if (!day) {
    return (
      <article className="bg-neutral-800 border border-neutral-600 p-3 rounded-lg text-center animate-pulse h-40"></article>
    );
  }
  if (error) {
    return (
      <article className="bg-neutral-800 border border-neutral-600 p-3 rounded-lg text-center h-40 flex justify-center items-center">
        <img src={Error} alt="Error" />
      </article>
    );
  }
  const name = getDayNameISO(day.date, 'en-US').slice(0, 3);
  return (
    <article className="bg-neutral-800 border border-neutral-600 flex flex-col justify-between p-3 rounded-lg text-center min-h-40" role="article" aria-label={`${name} forecast`}>
      <h4 className="capitalize text-sm">{name}</h4>
      <img src={weatherCodeToEmoji(day.code)} alt="Icon_Climate" />
      <div className="text-sm flex justify-between">
        <span className="font-medium text-base">{Math.round(day.max)}°</span>
        <span className='font-light text-base'>{Math.round(day.min)}°</span>
      </div>
    </article>
  );
}