import { getPlaces } from "../service/GlobalApi.jsx";
import React, { useEffect, useState } from "react";

const PHOTO_REF_URL = "https://places.googleapis.com/v1/{Name}/media?maxHeightPx=600&maxWidthPx=600&key="+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const InformationSection = ({ tripData }) => {
    const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    if (tripData?.userSelection?.Location?.label) {
      getPlacePhoto();
    }
  }, [tripData]);

  const getPlacePhoto = async () => {
    const locationLabel = tripData?.userSelection?.Location?.label;
    const result = await getPlaces(locationLabel);
    const photo_url = PHOTO_REF_URL.replace("{Name}", result.places[0].photos[0].name);
    setPhotoUrl(photo_url);
  };

  return (
    <div className="mt-5">
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src={photoUrl}
        alt="Airplane Icon"
      />
      <div className="flex flex-col gap-3 sm:gap-5 my-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
          {tripData?.userSelection?.Location?.label || "Unknown Location"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm sm:text-base">
            📅 {tripData?.userSelection?.noOfDays || "N/A"} days
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm sm:text-base">
            💰 {tripData?.userSelection?.budget || "N/A"} Budget
          </h2>
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm sm:text-base">
            👫 Travelers {tripData?.userSelection?.Travelers || "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
