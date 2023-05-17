/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import opencage from "opencage-api-client";
import { type Coordinates } from "~/hooks/GeoCoordinates";

const GetCompleteGeoLocation = ({ latitude, longitude }: Coordinates) => {
  return opencage
    .geocode({
      key: "80e451243f3c43bdac9f037c03587bde",
      q: `${latitude}, ${longitude}`,
    })
    .then((data: any) => {
      if (data.status.code === 200 || data.results.length > 0) {
        return data.results[0];
      }
      throw new Error("OpenCage API Error");
    })
    .catch(() => ({
      message:
        "Something went wrong please try again later! OpenCage API Error",
    }));
};

export default GetCompleteGeoLocation;
