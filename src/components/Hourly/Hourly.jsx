import { useState } from "react";

export function Hourly({ children }) {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(today);
    const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
    return (
        <section className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-3 text-neutral-0 mt-6">
            <div className="flex justify-between items-center">
                <h3 className=" font-medium">Hourly forecast</h3>
                <div className="relative inline-block text-left">
                    {/* Botón */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 bg-neutral-600 px-3 py-1 rounded-lg cursor-pointer"
                    >
                        <span className="text-neutral-0">{selected}</span>
                        <img
                            src="./assets/images/icon-dropdown.svg"
                            alt="dropdown"
                            className={`transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-2 p-1 w-40 bg-neutral-800 border border-neutral-600 text-white rounded-lg shadow-lg">
                            {days.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => {
                                        setSelected(day);
                                        setOpen(false);
                                    }}
                                    className="w-full text-left p-2 rounded-lg hover:bg-neutral-700"
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </section>
    );
}