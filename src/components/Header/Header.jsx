import { useState } from "react";

export function Header({ system, setSystem, unitConfig, setUnit}) {
  const [open, setOpen] = useState(false);

  // Componente de botón de opción
  const OptionButton = ({ label, value, selected, onSelect, className }) => (
    <button
      onClick={() => onSelect(value)}
      className={`w-full flex justify-between items-center text-left p-2 rounded-lg cursor-pointer hover:bg-neutral-700 ${className} ${
        selected === value ? "bg-neutral-700" : ""
      }`}
    >
      {label}
      {selected === value && (
        <img
          className="ml-2"
          src="/assets/images/icon-checkmark.svg"
          alt="check"
        />
      )}
    </button>
  );

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="./assets/images/logo.svg"
          alt="Logo_WeatherNow"
          className="w-3/4"
        />
      </div>

      {/* Right: Select Button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-neutral-800 text-neutral-0 p-2 rounded-lg cursor-pointer focus:ring-2 focus:ring-neutral-0 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          <img src="./assets/images/icon-units.svg" alt="Settings" />
          <span>Units</span>
          <img
            src="./assets/images/icon-dropdown.svg"
            alt="Dropdown"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute mt-2 p-1 bg-neutral-800 border border-neutral-600 text-white rounded-lg shadow-lg w-56 right-0 z-50">
            {/* Botón global */}
            <OptionButton
              label={`Switch to ${system === "metric" ? "Imperial" : "Metric"}`}
              value={system === "metric" ? "imperial" : "metric"}
              selected={system}
              onSelect={setSystem}
              className="focus:ring-2 focus:ring-neutral-0 focus:ring-offset-2 focus:ring-offset-neutral-900 "
            />

            {/* Opciones individuales (se marcan según el sistema activo) */}
            <section className="border-b border-neutral-600 mb-2">
              <p className="text-neutral-300 text-sm p-2">Temperature</p>
              <OptionButton
                label="Celsius (°C)"
                value="C"
                selected={unitConfig[system].temp}
                onSelect={(val) => setUnit(system, "temp", val)}
              />
              <OptionButton
                label="Fahrenheit (°F)"
                value="F"
                selected={unitConfig[system].temp}
                onSelect={(val) => setUnit(system, "temp", val)}
              />
            </section>

            <section className="border-b border-neutral-600 mb-2">
              <p className="text-neutral-300 text-sm p-2">Wind Speed</p>
              <OptionButton
                label="km/h"
                value="km"
                selected={unitConfig[system].wind}
                onSelect={(val) => setUnit(system, "wind", val)}
              />
              <OptionButton
                label="mph"
                value="mph"
                selected={unitConfig[system].wind}
                onSelect={(val) => setUnit(system, "wind", val)}
              />
            </section>

            <section className="mb-2">
              <p className="text-neutral-300 text-sm p-2">Precipitación</p>
              <OptionButton
                label="Millimeters (mm)"
                value="mm"
                selected={unitConfig[system].precip}
                onSelect={(val) => setUnit(system, "precip", val)}
              />
              <OptionButton
                label="Inches (in)"
                value="in"
                selected={unitConfig[system].precip}
                onSelect={(val) => setUnit(system, "precip", val)}
              />
            </section>
          </div>
        )}
      </div>
    </header>
  );
}

