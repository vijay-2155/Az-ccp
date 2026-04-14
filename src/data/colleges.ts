export interface College {
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export const colleges: College[] = [
  // IITs
  { name: "IIT Goa",          city: "Goa",            state: "Goa",               lat: 15.3624, lng: 73.8749 },
  { name: "IIT Kanpur",       city: "Kanpur",          state: "Uttar Pradesh",     lat: 26.5123, lng: 80.2329 },
  { name: "IIT Delhi",        city: "New Delhi",       state: "Delhi",             lat: 28.5450, lng: 77.1926 },
  { name: "IIT Bombay",       city: "Mumbai",          state: "Maharashtra",       lat: 19.1334, lng: 72.9133 },
  { name: "IIT Roorkee",      city: "Roorkee",         state: "Uttarakhand",       lat: 29.8643, lng: 77.8964 },
  { name: "IIT Hyderabad",    city: "Hyderabad",       state: "Telangana",         lat: 17.5937, lng: 78.1230 },
  { name: "IIT Patna",        city: "Patna",           state: "Bihar",             lat: 25.5244, lng: 84.8512 },
  { name: "IIT Indore",       city: "Indore",          state: "Madhya Pradesh",    lat: 22.5204, lng: 75.9178 },
  { name: "IIT BHU",          city: "Varanasi",        state: "Uttar Pradesh",     lat: 25.2677, lng: 82.9913 },

  // NITs
  { name: "NIT Calicut",      city: "Kozhikode",       state: "Kerala",            lat: 11.3228, lng: 75.9354 },
  { name: "NIT Trichy",       city: "Tiruchirappalli", state: "Tamil Nadu",        lat: 10.7604, lng: 78.8136 },
  { name: "NIT Warangal",     city: "Warangal",        state: "Telangana",         lat: 17.9847, lng: 79.5329 },
  { name: "NIT Rourkela",     city: "Rourkela",        state: "Odisha",            lat: 22.2549, lng: 84.9028 },
  { name: "NIT Surathkal",    city: "Mangalore",       state: "Karnataka",         lat: 13.0107, lng: 74.7952 },
  { name: "NIT Jaipur",       city: "Jaipur",          state: "Rajasthan",         lat: 26.8607, lng: 75.8143 },
  { name: "NIT Durgapur",     city: "Durgapur",        state: "West Bengal",       lat: 23.5361, lng: 87.3122 },
  { name: "NIT Silchar",      city: "Silchar",         state: "Assam",             lat: 24.7449, lng: 92.7944 },
  { name: "NIT Kurukshetra",  city: "Kurukshetra",     state: "Haryana",           lat: 29.9440, lng: 76.8180 },

  // IIITs
  { name: "IIIT Gwalior",     city: "Gwalior",         state: "Madhya Pradesh",    lat: 26.2183, lng: 78.1828 },
  { name: "IIIT Hyderabad",   city: "Hyderabad",       state: "Telangana",         lat: 17.4454, lng: 78.3495 },
  { name: "IIIT Allahabad",   city: "Allahabad",       state: "Uttar Pradesh",     lat: 25.4921, lng: 81.8720 },
  { name: "IIIT Delhi",       city: "New Delhi",       state: "Delhi",             lat: 28.5449, lng: 77.2730 },
  { name: "IIIT Bangalore",   city: "Bangalore",       state: "Karnataka",         lat: 12.9716, lng: 77.6412 },

  // Deemed / Private
  { name: "MIT Manipal",      city: "Manipal",         state: "Karnataka",         lat: 13.3525, lng: 74.7942 },
  { name: "BITS Patna",       city: "Patna",           state: "Bihar",             lat: 25.5949, lng: 84.8467 },
  { name: "BITS Goa",         city: "Goa",             state: "Goa",               lat: 15.3974, lng: 73.8780 },
  { name: "BITS Hyderabad",   city: "Hyderabad",       state: "Telangana",         lat: 17.5449, lng: 78.5718 },
  { name: "KIIT Bhubaneswar", city: "Bhubaneswar",     state: "Odisha",            lat: 20.3550, lng: 85.8195 },
  { name: "VIT Vellore",      city: "Vellore",         state: "Tamil Nadu",        lat: 12.9692, lng: 79.1559 },
  { name: "SRM Chennai",      city: "Chennai",         state: "Tamil Nadu",        lat: 12.8231, lng: 80.0444 },
  { name: "Thapar University",city: "Patiala",         state: "Punjab",            lat: 30.3517, lng: 76.3647 },
  { name: "DTU Delhi",        city: "New Delhi",       state: "Delhi",             lat: 28.7502, lng: 77.1178 },
  { name: "NSUT Delhi",       city: "New Delhi",       state: "Delhi",             lat: 28.6137, lng: 77.0303 },
  { name: "COEP Pune",        city: "Pune",            state: "Maharashtra",       lat: 18.5308, lng: 73.8474 },
  { name: "VJTI Mumbai",      city: "Mumbai",          state: "Maharashtra",       lat: 19.0209, lng: 72.8555 },
  { name: "BMSCE Bangalore",  city: "Bangalore",       state: "Karnataka",         lat: 12.9389, lng: 77.5638 },
  { name: "PES University",   city: "Bangalore",       state: "Karnataka",         lat: 12.9121, lng: 77.5399 },
  { name: "Amity Noida",      city: "Noida",           state: "Uttar Pradesh",     lat: 28.5440, lng: 77.3330 },
  { name: "LPU Phagwara",     city: "Phagwara",        state: "Punjab",            lat: 31.2554, lng: 75.7038 },
  { name: "Chandigarh Univ.", city: "Chandigarh",      state: "Punjab",            lat: 30.7721, lng: 76.5750 },
  {name : "Vignan's institute of Information Technology", city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.7261, lng: 83.3068 },
];
