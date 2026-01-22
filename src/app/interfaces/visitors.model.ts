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
  registrationStatus:string;
  attendanceStatus:string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

