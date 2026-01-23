export interface Visitor {
  fullName: string;
  mobileNumber: string;
  email: string;
  registrationFees: 'paid' | 'unpaid';
  attendanceStatus:string;
  attendanceScannedAt:any;
  scannerId:any;
  id:any;
  registrationNumber:any;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

