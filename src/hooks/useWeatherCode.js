import Drizzle from '/assets/images/icon-drizzle.webp';
import Fog from '/assets/images/icon-fog.webp';
import Overcast from '/assets/images/icon-overcast.webp';
import PartlyCloudy from '/assets/images/icon-partly-cloudy.webp';
import Rain from '/assets/images/icon-rain.webp';
import Snow from '/assets/images/icon-snow.webp';
import Storm from '/assets/images/icon-storm.webp';
import Sunny from '/assets/images/icon-sunny.webp';

export default function useWeatherCodeToEmoji(code) {
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