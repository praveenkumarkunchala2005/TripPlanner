import React from 'react';
import IndividualPlace from './IndividualPlace';

const PlacesToVisit = ({ tripData }) => {
  const itineraryDays = tripData?.tripData?.itinerary
    ? Object.entries(tripData.tripData.itinerary).sort(([a], [b]) => {
        const dayA = parseInt(a.replace(/\D/g, ''), 10);
        const dayB = parseInt(b.replace(/\D/g, ''), 10);
        return dayA - dayB;
      })
    : [];

  return (
    <div className="mt-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">📍 Places To Visit</h2>
      <div className="mt-5 space-y-6">
        {itineraryDays.length > 0 ? (
          itineraryDays.map(([dayKey, dayValue], index) => (
            <div key={index} className="p-4">
              <h2 className="text-lg md:text-xl font-bold text-start mb-4">📅 {dayKey.toUpperCase()}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.isArray(dayValue.plan) ? (
                  dayValue.plan.map((place, placeIndex) => (
                    <IndividualPlace key={placeIndex} place={place} />
                  ))
                ) : (
                  <p className="text-gray-500">No places listed for this day.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No itinerary available.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
