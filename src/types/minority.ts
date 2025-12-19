export interface MinorityFormData {
  // Personal Details
  firstName?: string;
  middleName?: string;
  grandfatherName?: string;
  surname?: string;
  village?: string;
  gender?: string;
  dob?: string;
  age?: number;
  bloodGroup?: string;
  whatsappNo?: string;
  mobileNo?: string;
  email?: string;
  maritalStatus?: string;
  dom?: string;
  fatherName?: string;
  maidenName?: string;
  maidenVillage?: string;
  education?: string;
  govtId?: string;
  govtIdNo?: string;


  // Residential Details
  resHouseNo?: string;
  resBuildingName?: string;
  resStreet?: string;
  resLandmark1?: string;
  resLandmark2?: string;
  resArea?: string;
  resCity?: string;
  resDistrict?: string;
  resState?: string;
  resCountry?: string;
  resPincode?: string;

  // Work Details
  occupation?: string;
  organizationName?: string;
  workHouseNo?: string;
  workBuildingName?: string;
  workStreet?: string;
  workLandmark1?: string;
  workLandmark2?: string;
  workArea?: string;
  workCity?: string;
  workDistrict?: string;
  workState?: string;
  workCountry?: string;
  workPincode?: string;

//   Family Details 


  // Reference Details
  references?: Array<{
    firstName: string;
    middleName?: string;
    surname: string;
    mobileNo: string;
    village: string;
  }>;



  govtIdFront?: string;
  govtIdBack?: string;
  photo?: string;
}


export interface StepProps {
  formData: MinorityFormData;
  setFormData: React.Dispatch<React.SetStateAction<MinorityFormData>>;
  onNext: (stepData: Partial<MinorityFormData>) => void;
  onPrevious?: () => void;
  loading: boolean;
}

