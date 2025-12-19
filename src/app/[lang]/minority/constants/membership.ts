// src/app/[lang]/minority/constants/membership.ts

export const LABELS = {
  firstName: { en: "First Name", gu: "પ્રથમ નામ" },
  lastName: { en: "Last Name", gu: "અટક" },

  email: { en: "Email", gu: "ઇમેઇલ" },
  phone: { en: "Phone Number", gu: "ફોન નંબર" },

  dob: { en: "Date of Birth", gu: "જન્મ તારીખ" },
  age: { en: "Age", gu: "ઉંમર" },

  gender: { en: "Gender", gu: "લિંગ" },

  address: { en: "Address", gu: "સરનામું" },
  city: { en: "City", gu: "શહેર" },
  state: { en: "State", gu: "રાજ્ય" },
  country: { en: "Country", gu: "દેશ" },
  pincode: { en: "Pincode", gu: "પિનકોડ" },

  bloodGroup: { en: "Blood Group", gu: "બ્લડ ગ્રુપ" },
  maritalStatus: { en: "Marital Status", gu: "વૈવાહિક સ્થિતિ" },

  occupation: { en: "Occupation", gu: "વ્યવસાય" },
  education: { en: "Education", gu: "શિક્ષણ" },

  profilePhoto: { en: "Profile Photo", gu: "પ્રોફાઇલ ફોટો" },
  idProof: { en: "ID Proof", gu: "ઓળખ પુરાવો" },

  membershipType: { en: "Membership Type", gu: "સભ્યપદ પ્રકાર" },
  familyMembers: { en: "Family Members", gu: "પરિવારના સભ્યો" },
} as const;

/* ===========================
   DROPDOWN / SELECT OPTIONS
   =========================== */

export const VILLAGES = [
  "Village 1",
  "Village 2",
  "Village 3",
];

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

export const EDUCATION_LEVELS = [
  "Primary",
  "Secondary",
  "Higher Secondary",
  "Graduate",
  "Post Graduate",
];

export const GOVT_ID_TYPES = [
  "Aadhaar Card",
  "PAN Card",
  "Voter ID",
  "Passport",
];

export const STATES = [
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
];

export const COUNTRIES = [
  "India",
];

export const OCCUPATIONS = [
  "Student",
  "Business",
  "Private Job",
  "Government Job",
  "Self Employed",
];
