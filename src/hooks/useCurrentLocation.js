import { useEffect, useState } from "react";

export default function useCurrentLocation(){
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                console.error("Error al obtener la ubicación: ", error)
            }
        );
    }, []);
    return coords;
}