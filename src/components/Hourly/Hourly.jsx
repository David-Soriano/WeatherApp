export function Hourly({ children }) {
    return (
        <section className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-3 text-neutral-0 mt-6">
            <div className="flex justify-between items-center">
                <h3 className=" font-medium">Hourly forecast</h3>
                <label htmlFor="selectDays" className="relative flex gap-2 bg-neutral-600 px-3 py-1 rounded-lg cursor-pointer">
                    <select
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        name="selectDays"
                        id="selectDays"
                    >
                        <option value="">Tuesday</option>
                    </select>

                    <span className="text-neutral-0 pointer-events-none">Tuesday</span>
                    <img src="./assets/images/icon-dropdown.svg" alt="dropdown" className="pointer-events-none" />
                </label>
            </div>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </section>
    );
}