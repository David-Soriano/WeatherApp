import ErrorImg from '/assets/images/icon-error.svg';
export default function Error(){
    return(
        <section className='flex flex-col items-center gap-3 max-w-115 mx-auto mt-15'>
            <img className='w-8' src={ErrorImg} alt="Icon_Error" />
            <h4 className='text-neutral-0 text-[43px] font-semibold'>Something went wrong</h4>
            <p className='text-neutral-200 text-center text-sm px-8'>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
            <button onClick={() => window.location.reload()} className='text-neutral-0 flex gap-2 cursor-pointer bg-neutral-600 p-2 rounded-lg text-sm'><img src="/assets/images/icon-retry.svg" alt="Icon_Retry" />Retry</button>
        </section>
    );
}