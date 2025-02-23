import { getPlaces } from "../service/GlobalApi.jsx";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const PHOTO_REF_URL = "https://places.googleapis.com/v1/{PHOTO_NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" + API_KEY;

const IndividualHotel = ({ hotel, index }) => {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (hotel?.hotelName) {
            getPlacePhoto();
        }
    }, [hotel?.hotelName]);

    const getPlacePhoto = async () => {
            const locationLabel = hotel?.hotelName;
            if (!locationLabel) return;
            const result = await getPlaces(locationLabel);
            const photoName = result.places[0].photos[0].name;
            const photoUrl = PHOTO_REF_URL.replace("{PHOTO_NAME}", photoName);
            setPhotoUrl(photoUrl);
    }

    return (
        <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}, ${hotel?.hotelAddress}`} target="_blank">
            <div className="p-4 border rounded-lg shadow-sm bg-white hover:scale-105 transition-all h-full flex flex-col justify-between">
                <img
                    className="rounded-xl w-full h-40 object-cover"
                    src={photoUrl || "https://cdn-icons-png.flaticon.com/512/7893/7893979.png"}
                    alt={hotel?.hotelName || "Hotel"}
                />
                <div className="my-2">
                    <h2 className="font-medium pt-1">{hotel?.hotelName}</h2>
                    <h2 className="text-xs pt-1 text-gray-500">{hotel?.hotelAddress}</h2>
                    <h2 className="text-sm pt-1">💰 Starting at Rs {hotel?.price?.min || "N/A"}</h2>
                    <h2 className="text-sm pt-1">⭐ Rating {hotel?.rating || "N/A"}</h2>
                </div>
            </div>
        </Link>
    );
};

export default IndividualHotel;
