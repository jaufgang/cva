export enum TripType {
  oneWay = 'oneWay',
  return = 'return',
  multiCity = 'multiCity',
}

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export interface CityPair {
  origin: string;
  destination: string;
}

export interface OneWayTrip {
  tripType: TripType.oneWay;
  usePoints: boolean;
  promoCode: string;
  passengers: Passengers;
  cities: CityPair;
  departureDate: string;
}

export interface ReturnTrip {
  tripType: TripType.return;
  usePoints: boolean;
  promoCode: string;
  passengers: Passengers;
  cities: CityPair;
  departureDate: string;
  returnDate: string;
}

export interface Flight {
  cities: CityPair;
  departureDate: string;
}

export interface MultiCityTrip {
  tripType: TripType.multiCity;
  usePoints: boolean;
  promoCode: string;
  passengers: Passengers;
  flights: Flight[];
}

export type Trip = MultiCityTrip | OneWayTrip | ReturnTrip;

// *** Type Guards ***

export const isOneWayTrip = (trip: Trip): trip is OneWayTrip =>
  trip.tripType === TripType.oneWay;

export const isReturnTrip = (trip: Trip): trip is ReturnTrip =>
  trip.tripType === TripType.return;

export const isMultiCityTrip = (trip: Trip): trip is MultiCityTrip =>
  trip.tripType === TripType.multiCity;

// *** Transformation Functions ***

export const tripTransformers: {
  [key: string]: { [key: string]: (trip: any) => Trip };
} = {
  oneWay: {
    return: OneWayToReturn,
    multiCity: OneWayToMultiCity,
  },
  return: {
    oneWay: ReturnToOneWay,
    multiCity: ReturnToMultiCity,
  },
  multiCity: {
    oneWay: MultiCityToOneWay,
    return: MultiCityToReturn,
  },
};

function OneWayToMultiCity({ tripType, ...trip }: OneWayTrip): MultiCityTrip {
  return {
    tripType: TripType.multiCity,
    usePoints: trip.usePoints,
    promoCode: trip.promoCode,
    passengers: trip.passengers,
    flights: [
      {
        cities: trip.cities,
        departureDate: trip.departureDate,
      },
    ],
  };
}

function MultiCityToOneWay(trip: MultiCityTrip): OneWayTrip {
  return {
    tripType: TripType.oneWay,
    usePoints: trip.usePoints,
    promoCode: trip.promoCode,
    passengers: trip.passengers,
    cities: trip.flights[0].cities,
    departureDate: trip.flights[0].departureDate,
  };
}

function ReturnToMultiCity(trip: ReturnTrip): MultiCityTrip {
  return {
    tripType: TripType.multiCity,
    usePoints: trip.usePoints,
    promoCode: trip.promoCode,
    passengers: trip.passengers,
    flights: [
      {
        cities: trip.cities,
        departureDate: trip.departureDate,
      },
      {
        cities: {
          origin: trip.cities.destination, // reverse the order of origin and destination for return flight
          destination: trip.cities.origin,
        },
        departureDate: trip.returnDate,
      },
    ],
  };
}

function MultiCityToReturn(trip: MultiCityTrip): ReturnTrip {
  // if any flight goes back to the origin of the first flight, treat that as a return flight
  const returnFlight = trip.flights.find(
    (flight) => flight.cities.destination === trip.flights[0].cities.origin
  );
  return {
    tripType: TripType.return,
    usePoints: trip.usePoints,
    promoCode: trip.promoCode,
    passengers: trip.passengers,
    departureDate: trip.flights[0].departureDate,
    cities: trip.flights[0].cities,
    returnDate: returnFlight?.departureDate || '',
  };
}

function OneWayToReturn(trip: OneWayTrip): ReturnTrip {
  return {
    tripType: TripType.return,
    usePoints: trip.usePoints,
    promoCode: trip.promoCode,
    passengers: trip.passengers,
    cities: trip.cities,
    departureDate: trip.departureDate,
    returnDate: '',
  };
}

function ReturnToOneWay(trip: ReturnTrip): OneWayTrip {
  return {
    tripType: TripType.oneWay,
    usePoints: trip.usePoints,
    promoCode: trip.promoCode,
    passengers: trip.passengers,
    cities: trip.cities,
    departureDate: trip.departureDate,
  };
}
