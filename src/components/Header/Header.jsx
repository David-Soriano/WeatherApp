export function Header() {
    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
            {/* Left: Logo */}
            <div className="flex items-center">
                <img src="./assets/images/logo.svg" alt="Logo_WeatherNow" className="w-3/4"/>
            </div>
            {/* Right: Select Button */}
            <div className="">
                <button className="flex items-center gap-2 bg-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none">
                    <img src="./assets/images/icon-units.svg" alt="Settings-icon" />
                    Units
                    <img src="./assets/images/icon-dropdown.svg" alt="" />
                </button>
            </div>
        </header>
    );
}