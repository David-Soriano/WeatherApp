import useWeatherCodeToEmoji from '../../hooks/useWeatherCode';

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
                    <img src={useWeatherCodeToEmoji(hour.code)} alt="Icon_Climate" className='w-full' />
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