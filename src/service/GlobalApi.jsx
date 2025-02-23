import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
if (!API_KEY) {
    console.error("❌ API Key is missing! Check your .env file.");
}

const config = {
    headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY, 
        "X-Goog-FieldMask": "places.displayName,places.photos,places.formattedAddress"
    },
};

export const getPlaces = async (query) => {
    const response = await axios.post(BASE_URL, { textQuery: query }, config);
    console.log("✅ API Response received:", response.data);
    return response.data;
}
