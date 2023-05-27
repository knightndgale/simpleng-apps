import { useEffect, useState } from "react";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

/*
 *  @maximumAge
 *  In Miliseconds
 *  Default value = 10 Minutes
 */
const maximumAge = Number(process.env.GEOLOCATION_MAXIMUM_AGE) ?? 600_000;

/**
 * @GeoCoordinates
 * This is a custom hooks the allows you to get the current user's coordinates
 * @author {Mark Dave Soriano}
 * @maximumAge Age of coordinates
 * Default = 10 Minutes
 * Add GEOLOCATION_MAXIMUM_AGE in your ENV and set a number of miliseconds
 * @returns {coordinates, error}
 */
const useGeoCoordinates = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [error, setError] = useState<string>();

  const successCallback = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setCoordinates({ latitude, longitude });
  };

  const errorCallback = (positionError: GeolocationPositionError) => {
    console.error(positionError);
    setError(positionError.message);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      maximumAge,
    });
  }, []);

  return { coordinates, error };
};

export default useGeoCoordinates;
