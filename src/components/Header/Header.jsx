import { useState } from "react";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
            {/* Left: Logo */}
            <div className="flex items-center">
                <img src="./assets/images/logo.svg" alt="Logo_WeatherNow" className="w-3/4" />
            </div>
            {/* Right: Select Button */}
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 bg-neutral-800 text-neutral-0 p-2 rounded-lg"
                >
                    <img src="./assets/images/icon-units.svg" alt="Settings" />
                    <span>Units</span>
                    <img src="./assets/images/icon-dropdown.svg" alt="Dropdown" />
                </button>

                {open && (
                    <div className="absolute mt-2 p-1 bg-neutral-800 border border-neutral-600 text-white rounded-lg shadow-lg w-48 right-0">
                        <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">Switch to Imperial</button>
                        <section className="border-b border-neutral-600 mb-2">
                            <p className="text-neutral-300 text-sm p-2">Temperature</p>
                            <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">Celsius (°C)</button>
                            <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">Fahrenheit (°F)</button>
                        </section>

                        <section className="border-b border-neutral-600 mb-2">
                            <p className="text-neutral-300 text-sm p-2">Wind Speed</p>
                            <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">km/h</button>
                            <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">mph</button>
                        </section>

                        <section className=" mb-2">
                            <p className="text-neutral-300 text-sm p-2">Precipitación</p>
                            <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">Millimeters (mm)</button>
                            <button className="w-full text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700">Inches (in)</button>
                        </section>
                    </div>
                )}
            </div>
        </header>
    );
}