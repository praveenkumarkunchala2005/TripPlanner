import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc,getDoc } from "firebase/firestore"; 
import { db } from '../service/FirebaseConfig';
import InformationSection from '../components/InformationSection.jsx';
import Hotels from '../components/Hotels.jsx';
import PlacesToVisit from '../components/PlacesToVisit.jsx';

const ViewTrip = () => {
    const {id} = useParams();
    const [tripData, setTripData] = useState([]);
    useEffect(()=>{
        id&&GetTripData();
    },[id]);
    const GetTripData = async ()=>{
        const docRef = doc(db, "TripPlan", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setTripData(docSnap.data());
        } else {
            // console.log("No such document!");
            toast.error('No such Document found', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* INFORMATION SECTION */}
        <InformationSection tripData={tripData}/>
        {/* RECOMENDED HOTELS */}
        <Hotels tripData={tripData}/>
        {/* DAILY PLAN */}
        <PlacesToVisit tripData={tripData}/>
    </div>
  )
}

export default ViewTrip;