export interface Visitor {
  registrationId: number;
  fullName: string;
  mobileNumber: string;
  email: string;
  gender: string;
  stateDistrict: string;
  address: string;
  dateOfBirth: string;
  maritalStatus: string;
  registrationFees: 'paid' | 'unpaid';
  registeredOn: string;
}
