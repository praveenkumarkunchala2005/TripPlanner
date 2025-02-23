import React, { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AI_PROMT, SelectBudgetList, SelectTravelesList } from '../constants/options'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { chatSession } from '../service/AIModal';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../service/FirebaseConfig';
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useUser();
  const router = useNavigate();
  const handleInputChange = (name,value) => {
    setFormData({ ...formData, [name]: value });
  }
  // useEffect(() => {
  //   // console.log(formData);
  // }, [formData])
  
  const onGenerateTrip = async () => {  
    if ((formData?.noOfDays > 5 && !formData?.Location) || !formData?.noOfDays || !formData?.budget || !formData?.Travelers) {
      toast.error('Please fill all the fields', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setLoading(true);
    const FINAL_PROMT = AI_PROMT.replace('{location}', place.label)
                                .replace('{totalDays}', formData.noOfDays)
                                .replace('{Travelers}', formData.Travelers)
                                .replace('{budget}', formData.budget);

    // console.log("Generated Prompt:", FINAL_PROMT);
    // console.log("Form Data:", formData);
    const result = await chatSession.sendMessage(FINAL_PROMT);
    SaveTripPlan(result.response.text());
    setLoading(false);
};

const SaveTripPlan = async (TripData)=>{
  setLoading(true);
  const docId = Date.now().toString();
  await setDoc(doc(db, "TripPlan", docId), {
    userSelection:formData,
    tripData:JSON.parse(TripData),
    userEmail: user?.primaryEmailAddress?.emailAddress,
    id: docId,
  });
  setLoading(false);
  router('/my-trips/'+docId);
};


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              onChange: (value) => {setPlace(value), handleInputChange('Location', value)},            
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <input type="Number" placeholder='Eg: 4' id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          ></input>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetList.map((item,index) => (
              <div key={index} 
                onClick={()=>handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${formData.budget === item.title ? 'border-orange-500' : 'border-gray-300'}`}>                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item,index) => (
              <div key={index} 
                onClick={()=>handleInputChange('Travelers', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${formData.Travelers === item.people ? 'border-orange-500' : 'border-gray-300'}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 flex justify-end">
          <button 
            disabled={loading}
            type="button" 
            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            onClick={onGenerateTrip}
          >
            {loading ? 'Generating Trip...' : 'Generate Trip'}
          </button>        
        </div>
      </div>
    </div>
  )
}

export default CreateTrip