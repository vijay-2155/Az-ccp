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
  { name: "IIIT Bhagalpur",   city: "Bhagalpur",       state: "Bihar",             lat: 25.2425, lng: 86.9842 },
  { name: "IIIT Sonepat",     city: "Sonepat",         state: "Haryana",           lat: 28.9931, lng: 77.0151 },

  // Deemed / Private
  { name: "MIT Manipal",                                    city: "Manipal",         state: "Karnataka",         lat: 13.3525, lng: 74.7942 },
  { name: "BITS Patna",                                     city: "Patna",           state: "Bihar",             lat: 25.5949, lng: 84.8467 },
  { name: "BITS Goa",                                       city: "Goa",             state: "Goa",               lat: 15.3974, lng: 73.8780 },
  { name: "BITS Hyderabad",                                 city: "Hyderabad",       state: "Telangana",         lat: 17.5449, lng: 78.5718 },
  { name: "KIIT Bhubaneswar",                               city: "Bhubaneswar",     state: "Odisha",            lat: 20.3550, lng: 85.8195 },
  { name: "VIT Vellore",                                    city: "Vellore",         state: "Tamil Nadu",        lat: 12.9692, lng: 79.1559 },
  { name: "SRM Chennai",                                    city: "Chennai",         state: "Tamil Nadu",        lat: 12.8231, lng: 80.0444 },
  { name: "Thapar University",                              city: "Patiala",         state: "Punjab",            lat: 30.3517, lng: 76.3647 },
  { name: "DTU Delhi",                                      city: "New Delhi",       state: "Delhi",             lat: 28.7502, lng: 77.1178 },
  { name: "NSUT Delhi",                                     city: "New Delhi",       state: "Delhi",             lat: 28.6137, lng: 77.0303 },
  { name: "COEP Pune",                                      city: "Pune",            state: "Maharashtra",       lat: 18.5308, lng: 73.8474 },
  { name: "VJTI Mumbai",                                    city: "Mumbai",          state: "Maharashtra",       lat: 19.0209, lng: 72.8555 },
  { name: "BMSCE Bangalore",                                city: "Bangalore",       state: "Karnataka",         lat: 12.9389, lng: 77.5638 },
  { name: "PES University",                                 city: "Bangalore",       state: "Karnataka",         lat: 12.9121, lng: 77.5399 },
  { name: "Amity Noida",                                    city: "Noida",           state: "Uttar Pradesh",     lat: 28.5440, lng: 77.3330 },
  { name: "LPU Phagwara",                                   city: "Phagwara",        state: "Punjab",            lat: 31.2554, lng: 75.7038 },
  { name: "Chandigarh Univ.",                               city: "Chandigarh",      state: "Punjab",            lat: 30.7721, lng: 76.5750 },
  { name: "Vignan's Institute of Information Technology",   city: "Visakhapatnam",   state: "Andhra Pradesh",    lat: 17.7261, lng: 83.3068 },
  { name: "SASTRA Deemed University",                       city: "Thanjavur",       state: "Tamil Nadu",        lat: 10.7870, lng: 79.1378 },

  // New colleges added
  { name: "Amity University Lucknow",                                    city: "Lucknow",         state: "Uttar Pradesh",     lat: 26.8326, lng: 80.9718 },
  { name: "Asansol Engineering College",                                 city: "Asansol",         state: "West Bengal",       lat: 23.6861, lng: 86.9735 },
  { name: "Babu Banarsi Das Institute of Technology and Management",     city: "Ghaziabad",       state: "Uttar Pradesh",     lat: 28.6677, lng: 77.4538 },
  { name: "BIT Mesra Patna",                                             city: "Patna",           state: "Bihar",             lat: 25.5941, lng: 85.1376 },
  { name: "DY Patil Agriculture and Technical University",               city: "Talsande",        state: "Maharashtra",       lat: 16.7148, lng: 74.2432 },
  { name: "Fr. C. Rodrigues Institute of Technology",                    city: "Vashi",           state: "Maharashtra",       lat: 19.0758, lng: 73.0099 },
  { name: "G.H. Raisoni College of Engineering, Pune",                   city: "Pune",            state: "Maharashtra",       lat: 18.5804, lng: 73.7898 },
  { name: "Government Engineering College Jehanabad",                    city: "Jehanabad",       state: "Bihar",             lat: 25.2154, lng: 84.9953 },
  { name: "Government Engineering College Patan",                        city: "Patan",           state: "Gujarat",           lat: 23.8495, lng: 72.1265 },
  { name: "Gyan Ganga Institute of Technology and Sciences",             city: "Jabalpur",        state: "Madhya Pradesh",    lat: 23.1940, lng: 79.9470 },
  { name: "Haldia Institute of Technology",                              city: "Haldia",          state: "West Bengal",       lat: 22.0667, lng: 88.1083 },
  { name: "Institute of Engineering and Management, Kolkata",            city: "Kolkata",         state: "West Bengal",       lat: 22.6203, lng: 88.4336 },
  { name: "kalinga Institute of Industrial Technology",                  city: "Bhubaneswar",     state: "Odisha",            lat: 20.3558, lng: 85.8192 },
  { name: "Khwaza Moinudin Chisti Language University",                  city: "Lucknow",         state: "Uttar Pradesh",     lat: 26.8501, lng: 80.9459 },
  { name: "KIET Group of Institutions",                                  city: "Ghaziabad",       state: "Uttar Pradesh",     lat: 28.7420, lng: 77.6025 },
  { name: "KLE Technological University",                                city: "Hubli",           state: "Karnataka",         lat: 15.3647, lng: 75.1239 },
  { name: "LBS Institute of Technology for Women",                       city: "Thiruvananthapuram", state: "Kerala",          lat: 8.5497,  lng: 76.9146 },
  { name: "MET Institute of Technology",                                 city: "Mumbai",          state: "Maharashtra",       lat: 19.1940, lng: 72.9614 },
  { name: "MRU College",                                                 city: "Faridabad",       state: "Haryana",           lat: 28.3670, lng: 77.3298 },
  { name: "Panjab University SSGRC",                                     city: "Hoshiarpur",      state: "Punjab",            lat: 31.5267, lng: 75.9105 },
  { name: "S B Jain Institute of Technology Management and Research",    city: "Nagpur",          state: "Maharashtra",       lat: 21.1782, lng: 79.0450 },
  { name: "Saharsa College of Engineering",                              city: "Saharsa",         state: "Bihar",             lat: 25.8828, lng: 86.5983 },
  { name: "Samrat Ashok Technological Institute",                        city: "Vidisha",         state: "Madhya Pradesh",    lat: 23.5260, lng: 77.8052 },
  { name: "Sandip Institute of Technology and Research Center",          city: "Nashik",          state: "Maharashtra",       lat: 20.0626, lng: 73.8562 },
  { name: "Shri G.S. Institute of Technology & Science",                 city: "Indore",          state: "Madhya Pradesh",    lat: 22.7177, lng: 75.8571 },
  { name: "Shri Ramswaroop Memorial College of Engineering",             city: "Lucknow",         state: "Uttar Pradesh",     lat: 26.8100, lng: 81.0229 },
  { name: "University of Lucknow",                                       city: "Lucknow",         state: "Uttar Pradesh",     lat: 26.8560, lng: 80.9470 },
  { name: "UPL University of Sustainable Technology",                    city: "Ankleshwar",      state: "Gujarat",           lat: 21.6266, lng: 73.0145 },
  { name: "Vignan Institute of Engineering for Women",                   city: "Visakhapatnam",   state: "Andhra Pradesh",    lat: 17.6984, lng: 83.2145 },
];
