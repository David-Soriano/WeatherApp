import { getDayNameISO } from '../../utils/dates';
import useWeatherCodeToEmoji from '../../hooks/useWeatherCode';

import Error from '/assets/images/icon-error.svg';

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
    <article className="bg-neutral-800 border border-neutral-600 flex flex-col justify-between p-3 rounded-lg text-center min-h-40 h-auto" role="article" aria-label={`${name} forecast`}>
      <h4 className="capitalize text-sm">{name}</h4>
      <img src={useWeatherCodeToEmoji(day.code)} alt="Icon_Climate" />
      <div className="text-sm flex justify-between">
        <span className="font-medium text-base">{Math.round(day.max)}°</span>
        <span className='font-light text-base'>{Math.round(day.min)}°</span>
      </div>
    </article>
  );
}