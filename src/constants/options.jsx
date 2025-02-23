export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A Solo Traveler',
        icon: '✈️',
        people: '1 Person',
    },
    {
        id: 2,
        title: 'Me & My Partner',
        desc: 'A Couple',
        icon: '👫',
        people: '2 People',
    },
    {
        id: 3,
        title: 'My Family',
        desc: 'Me & My Family',
        icon: '🏡',
        people: '4 People',
    },
    {
        id: 4,
        title: 'Me & My Friends',
        desc: 'A Group of Friends',
        icon: '👫👫',
        people: '5 To 10 People',
    },
];
export const SelectBudgetList = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay Conscious of the Cost',
        icon: '💰',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the Average Side',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t Worry About the Cost',
        icon: '💸',
    },
];

export const AI_PROMT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {Travelers} with a {budget} budget, give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';