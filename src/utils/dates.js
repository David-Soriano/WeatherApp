export function formatISODate(date){
    return date.toISOString().slice(0, 10);
}

export function getMondayOfWeek(date = new Date()){
    const d = new Date(date);
    const day = d.getDay();
    const diffToMonday = (day + 6) % 7;
    d.setDate(d.getDate() - diffToMonday);
    d.setHours(0, 0, 0);
    return d;
}

export function getWeekISOFrom(date = new Date()){
    const monday = getMondayOfWeek(date);
    return Array.from({length:7}).map((_,i) => {
        const d = new Date (monday);
        d.setDate(monday.getDate() + i);
        return formatISODate(d);
    });
}

export function getDayNameISO(dateIso, locale = 'es-US'){
    const d = new Date(dateIso);
    return d.toLocaleDateString(locale, { weekday: 'long' });
}