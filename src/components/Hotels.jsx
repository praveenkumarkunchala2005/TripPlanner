import React from "react";
import { Link } from "react-router-dom";
import IndividualHotel from "./IndividualHotel";

const Hotels = ({ tripData }) => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
        Hotel Recomendation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {tripData?.tripData?.hotelOptions?.map((hotel, index) => (
            <IndividualHotel key={index} hotel={hotel}/>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
