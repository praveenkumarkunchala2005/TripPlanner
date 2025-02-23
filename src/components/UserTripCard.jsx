import {React,useEffect,useState} from 'react'
import { getPlaces } from "../service/GlobalApi.jsx";
import { Link } from 'react-router-dom'
const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const PHOTO_REF_URL = "https://places.googleapis.com/v1/{PHOTO_NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" + API_KEY;
const UserTripCard = ({trip,index}) => {
        const [photoUrl, setPhotoUrl] = useState("");
    
        useEffect(() => {
            if (trip?.userSelection?.Location?.label) {
                getPlacePhoto();
            }
        }, [trip?.userSelection?.Location?.label]);
    
        const getPlacePhoto = async () => {
                const locationLabel = trip?.userSelection?.Location?.label;
                if (!locationLabel) return;
                const result = await getPlaces(locationLabel);
                const photoName = result.places[0].photos[0].name;
                const photoUrl = PHOTO_REF_URL.replace("{PHOTO_NAME}", photoName);
                setPhotoUrl(photoUrl);
        }
  return (
        <Link key={index} to={`/my-trips/${trip?.id}`}>
        <div className='p-4 border border-amber-500 rounded-lg bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col h-full'>
        <img
            src={photoUrl}
            className='object-cover rounded-lg' 
        />
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.Location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
        </div>
    </Link>
  )
}
export default UserTripCard