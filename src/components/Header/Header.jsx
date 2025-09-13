export function Header() {
    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
            {/* Left: Logo */}
            <div className="flex items-center">
                <img src="./assets/images/logo.svg" alt="Logo_WeatherNow" className="w-3/4" />
            </div>
            {/* Right: Select Button */}
            <label htmlFor="selectUnits" className="relative flex items-center gap-2 bg-neutral-800 p-2 rounded-lg cursor-pointer">
                <img src="./assets/images/icon-units.svg" alt="Settings-icon" />

                <select
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    name="selectUnits"
                    id="selectUnits"
                >
                    <option value="">Units</option>
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                </select>

                <span className="text-neutral-0 pointer-events-none">Units</span>
                <img src="./assets/images/icon-dropdown.svg" alt="dropdown" className="pointer-events-none" />
            </label>

        </header>
    );
}