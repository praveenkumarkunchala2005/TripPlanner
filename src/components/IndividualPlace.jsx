import React from "react";
import { getPlaces } from "../service/GlobalApi.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const PHOTO_REF_URL = "https://places.googleapis.com/v1/{PHOTO_NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" + API_KEY;

const IndividualPlace = ({place,placeIndex}) => {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (place?.placeName) {
            getPlacePhoto();
        }
    }, [place?.placeName]);

    const getPlacePhoto = async () => {
            const locationLabel = place?.placeName;
            if (!locationLabel) return;
            const result = await getPlaces(locationLabel);
            const photoName = result.places[0].photos[0].name;
            const photoUrl = PHOTO_REF_URL.replace("{PHOTO_NAME}", photoName);
            setPhotoUrl(photoUrl);
    }
  return (
    <>
      <Link
        key={placeIndex}
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          place.placeName
        )}`}
        target="_blank"
        className="block h-full"
      >
        <div className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col h-full">
          <div className="h-40 w-full">
            <img
              className="w-full h-full object-cover rounded-md"
              src={photoUrl}
              alt={place.placeName}
            />
          </div>

          <div className="flex flex-col flex-grow justify-between mt-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {place.placeName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{place.placeDetails}</p>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <p>
                ⭐ <strong>{place.rating}</strong> | 💰 {place.ticketPricing}
              </p>
              <p>⏳ Best Time: {place.timeTravel}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default IndividualPlace;
