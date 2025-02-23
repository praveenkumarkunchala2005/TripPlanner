import { React,useEffect,useState } from 'react'
import { collection, getDocs, query, where,doc } from 'firebase/firestore';
import { db } from '../service/FirebaseConfig';
import { useUser } from "@clerk/clerk-react"
import UserTripCard from '../components/UserTripCard.jsx';

const MyTrips = () => {
  const {user} = useUser();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(()=>{
    getUserTrips();
  },[])
  const getUserTrips = async ()=>{
    setUserTrips([]);
    const q = query(collection(db, "TripPlan"), where("userEmail", "==", user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        setUserTrips([...userTrips,doc.data()]);
    });
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.map((trip,index)=>(
          <UserTripCard key={index} trip={trip}/>
        ))}
      </div>
    </div>
  )
}

export default MyTrips