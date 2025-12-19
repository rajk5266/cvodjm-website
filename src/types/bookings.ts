// types/booking.ts

export type BookingType = 'room' | 'hall';

export type RoomLocation = 'ghatkopar' | 'palitana1' | 'palitana2';
export type HallLocation = 'lalbaug' | 'bhatbazaar';

export type BookingLocation = RoomLocation | HallLocation;

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type PaymentMode = 'cash' | 'online' | 'cheque' | 'upi';
export type Gender = 'male' | 'female' | 'other';
export type GovtIdType = 'aadhar' | 'pan' | 'passport' | 'driving_license' | 'voter_id';
export type RoomCategory = 'standard' | 'deluxe' | 'suite';
export type RoomType = 'single' | 'double' | 'triple' | 'family';
export type HallCategory = 'main_hall' | 'conference_hall' | 'banquet_hall';
export type OccasionType = 'wedding' | 'reception' | 'birthday' | 'conference' | 'meeting' | 'other';
export type RefundStatus = 'pending' | 'processed' | 'completed';

// Personal Details Interface
export interface PersonalDetails {
  firstName: string;
  middleName: string;
  surname: string;
  villageName: string;
  gender: Gender;
  dob: string;
  age: number;
  whatsappNo: string;
  mobileNo: string;
  emailId: string;
  govtId: GovtIdType;
  govtIdNo: string;
  govtIdFrontUrl?: string;
  govtIdBackUrl?: string;
  photoUrl?: string;
}

// Residential Details Interface
export interface ResidentialDetails {
  houseFlatBlockPlotNo: string;
  houseBuildingName: string;
  streetRoadName: string;
  landmark1: string;
  landmark2: string;
  areaTown: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}

// Room Details Interface
export interface RoomDetails {
  roomCategory: RoomCategory;
  roomType: RoomType;
  fromDateTime: string;
  toDateTime: string;
  noOfAdults: number;
  noOfChildren: number;
  noOfVehicles: number;
}

// Food Details for Room Interface
export interface RoomFoodDetails {
  lunchDinnerRequired: boolean;
  noOfPlates: number;
}

// Hall Details Interface
export interface HallDetails {
  hallCategory: HallCategory;
  occasion: OccasionType;
  fromDateTime: string;
  toDateTime: string;
  noOfGuestsExpected: number;
}

// Food Details for Hall Interface
export interface HallFoodDetails {
  foodServed: boolean;
  nameOfCaterers?: string;
  addressOfCaterers?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
}

// Payment Details Interface
export interface PaymentDetails {
  depositAmount: number;
  rentAmount: number;
  miscAmount: number;
  total: number;
  advance: number;
  paymentMode: PaymentMode;
  paymentDate: string;
  paymentProofUrl?: string;
}

// Office Use Details Interface
export interface OfficeUseDetails {
  bookingStatus: BookingStatus;
  blockNo?: string;
  depositReceiptNo?: string;
  checkIn?: string;
  checkOut?: string;
  electricityMeterIn?: number;
  electricityMeterOut?: number;
  gasMeterIn?: number;
  gasMeterOut?: number;
  refundStatus?: RefundStatus;
  refundReceiptNo?: string;
  refundAmount?: number;
  refundMode?: PaymentMode;
  refundBankAccount?: string;
  refundDate?: string;
  refundProofUrl?: string;
}

// Room Booking Interface
export interface RoomBooking {
  applicationNo: string;
  dateOfApplication: string;
  bookingType: 'room';
  location: RoomLocation;
  personalDetails: PersonalDetails;
  residentialDetails: ResidentialDetails;
  roomDetails: RoomDetails;
  foodDetails: RoomFoodDetails;
  paymentDetails: PaymentDetails;
  officeUseDetails: OfficeUseDetails;
  primaryMemberId?: string;
}

// Hall Booking Interface
export interface HallBooking {
  applicationNo: string;
  dateOfApplication: string;
  bookingType: 'hall';
  location: HallLocation;
  personalDetails: PersonalDetails;
  residentialDetails: ResidentialDetails;
  hallDetails: HallDetails;
  foodDetails: HallFoodDetails;
  paymentDetails: PaymentDetails;
  officeUseDetails: OfficeUseDetails;
  primaryMemberId?: string;
}

// Union type for any booking
export type Booking = RoomBooking | HallBooking;

// Filter Interface
export interface BookingFilters {
  bookingType: BookingType | null;
  location: BookingLocation | null;
  status?: BookingStatus;
  dateFrom?: string;
  dateTo?: string;
}

// Member Interface (for selection)
export interface Member {
  id: string;
  firstName: string;
  middleName: string;
  surname: string;
  mobileNo: string;
  emailId: string;
  villageName: string;
  photoUrl?: string;
}

// API Response Interface
export interface MembersResponse {
  success: boolean;
  data: Member[];
  message?: string;
}

// Booking Form Data (before submission)
export interface BookingFormData {
  bookingType: BookingType;
  location: BookingLocation;
  personalDetails: Partial<PersonalDetails>;
  residentialDetails: Partial<ResidentialDetails>;
  roomDetails?: Partial<RoomDetails>;
  hallDetails?: Partial<HallDetails>;
  foodDetails: Partial<RoomFoodDetails> | Partial<HallFoodDetails>;
  paymentDetails: Partial<PaymentDetails>;
  primaryMemberId?: string;
  useMemberData?: boolean;
}

// Location Options
export const ROOM_LOCATIONS: { value: RoomLocation; label: string }[] = [
  { value: 'ghatkopar', label: 'Ghatkopar' },
  { value: 'palitana1', label: 'Palitana 1' },
  { value: 'palitana2', label: 'Palitana 2' },
];

export const HALL_LOCATIONS: { value: HallLocation; label: string }[] = [
  { value: 'lalbaug', label: 'Lalbaug' },
  { value: 'bhatbazaar', label: 'Bhatbazaar' },
];

// Dropdown Options
export const GOVT_ID_OPTIONS: { value: GovtIdType; label: string }[] = [
  { value: 'aadhar', label: 'Aadhar Card' },
  { value: 'pan', label: 'PAN Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'driving_license', label: 'Driving License' },
  { value: 'voter_id', label: 'Voter ID' },
];

export const ROOM_CATEGORY_OPTIONS: { value: RoomCategory; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'suite', label: 'Suite' },
];

export const ROOM_TYPE_OPTIONS: { value: RoomType; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'triple', label: 'Triple' },
  { value: 'family', label: 'Family' },
];

export const HALL_CATEGORY_OPTIONS: { value: HallCategory; label: string }[] = [
  { value: 'main_hall', label: 'Main Hall' },
  { value: 'conference_hall', label: 'Conference Hall' },
  { value: 'banquet_hall', label: 'Banquet Hall' },
];

export const OCCASION_OPTIONS: { value: OccasionType; label: string }[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'reception', label: 'Reception' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'conference', label: 'Conference' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'other', label: 'Other' },
];

export const PAYMENT_MODE_OPTIONS: { value: PaymentMode; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'online', label: 'Online Transfer' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'upi', label: 'UPI' },
];

// Advance amounts
export const ROOM_ADVANCE = 1050; // 1000 advance + 50 application fees
export const HALL_ADVANCE = 5100; // 5000 advance + 100 application fees