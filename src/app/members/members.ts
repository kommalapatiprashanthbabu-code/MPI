import { Visitor } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { VisitorService } from './members-service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-members',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormlyModule,FormlyBootstrapModule,RouterLink],
  standalone:true,
  templateUrl: './members.html',
  styleUrl: './members.css',
})

export class Members implements OnInit {
  form = new FormGroup({});
  model: Partial<Visitor> = {};
fields: FormlyFieldConfig[] = [
  {
    fieldGroupClassName: 'row g-3',
    fieldGroup: [
      {
        key: 'fullName',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Full Name',
          required: true,
          placeholder: 'Enter full name'
        }
      },
      {
        key: 'mobileNumber',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Mobile Number',
          required: true,
          placeholder: 'Enter mobile number'
        }
      },
      {
        key: 'email',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email'
        }
      },
      {
        key: 'gender',
        type: 'select',
        className: 'col-md-6',
        templateOptions: {
          label: 'Gender',
          options: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
          ]
        }
      },
      {
        key: 'stateDistrict',
        type: 'input',
        className: 'col-md-12',
        templateOptions: {
          label: 'State / District',
          placeholder: 'Enter state and district'
        }
      }
    ]
  }
];

  isEditMode = false;
  members:any =  [
  {
    registrationId: 101,
    fullName: 'Prashanth Babu',
    mobileNumber: '9876543210',
    email: 'prashanth@gmail.com',
    gender: 'Male',
    stateDistrict: 'Hyderabad, Telangana',
    address: 'Kukatpally, Hyderabad',
    dateOfBirth: '1995-06-12',
    maritalStatus: 'Single',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 10:15:30'
  },
  {
    registrationId: 102,
    fullName: 'Aamir Khan',
    mobileNumber: '9123456789',
    email: 'aamir.khan@gmail.com',
    gender: 'Male',
    stateDistrict: 'Hyderabad, Telangana',
    address: 'Tolichowki, Hyderabad',
    dateOfBirth: '1992-03-18',
    maritalStatus: 'Married',
    registrationFees: 'unpaid',
    registeredOn: '2025-12-20 10:30:10'
  },
  {
    registrationId: 103,
    fullName: 'Sunita Reddy',
    mobileNumber: '9988776655',
    email: 'sunita.reddy@gmail.com',
    gender: 'Female',
    stateDistrict: 'Vijayawada, Andhra Pradesh',
    address: 'Benz Circle, Vijayawada',
    dateOfBirth: '1990-08-25',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 10:45:42'
  },
  {
    registrationId: 104,
    fullName: 'Imran Shaikh',
    mobileNumber: '9012345678',
    email: 'imran.shaikh@gmail.com',
    gender: 'Male',
    stateDistrict: 'Mumbai, Maharashtra',
    address: 'Andheri West, Mumbai',
    dateOfBirth: '1988-11-02',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 11:05:18'
  },
  {
    registrationId: 105,
    fullName: 'Anjali Verma',
    mobileNumber: '9090909090',
    email: 'anjali.verma@gmail.com',
    gender: 'Female',
    stateDistrict: 'Bhopal, Madhya Pradesh',
    address: 'MP Nagar, Bhopal',
    dateOfBirth: '1996-01-14',
    maritalStatus: 'Single',
    registrationFees: 'unpaid',
    registeredOn: '2025-12-20 11:20:55'
  },
  {
    registrationId: 106,
    fullName: 'Suresh Kumar',
    mobileNumber: '9845671234',
    email: 'suresh.kumar@gmail.com',
    gender: 'Male',
    stateDistrict: 'Chennai, Tamil Nadu',
    address: 'Velachery, Chennai',
    dateOfBirth: '1985-07-09',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 11:40:22'
  },
  {
    registrationId: 107,
    fullName: 'Farah Ali',
    mobileNumber: '9345612789',
    email: 'farah.ali@gmail.com',
    gender: 'Female',
    stateDistrict: 'Lucknow, Uttar Pradesh',
    address: 'Alambagh, Lucknow',
    dateOfBirth: '1994-09-30',
    maritalStatus: 'Single',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 12:00:05'
  },
  {
    registrationId: 108,
    fullName: 'Rohit Singh',
    mobileNumber: '9567891234',
    email: 'rohit.singh@gmail.com',
    gender: 'Male',
    stateDistrict: 'Jaipur, Rajasthan',
    address: 'Malviya Nagar, Jaipur',
    dateOfBirth: '1991-04-21',
    maritalStatus: 'Married',
    registrationFees: 'unpaid',
    registeredOn: '2025-12-20 12:18:49'
  },
  {
    registrationId: 109,
    fullName: 'Meena Patel',
    mobileNumber: '9871234560',
    email: 'meena.patel@gmail.com',
    gender: 'Female',
    stateDistrict: 'Ahmedabad, Gujarat',
    address: 'Navrangpura, Ahmedabad',
    dateOfBirth: '1989-12-11',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 12:35:16'
  },
  {
    registrationId: 110,
    fullName: 'Karthik R',
    mobileNumber: '9988123456',
    email: 'karthik.r@gmail.com',
    gender: 'Male',
    stateDistrict: 'Bengaluru, Karnataka',
    address: 'Whitefield, Bengaluru',
    dateOfBirth: '1993-05-27',
    maritalStatus: 'Single',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 12:55:40'
  }
];
  filteredMembers: any=  [
  {
    registrationId: 101,
    fullName: 'Prashanth Babu',
    mobileNumber: '9876543210',
    email: 'prashanth@gmail.com',
    gender: 'Male',
    stateDistrict: 'Hyderabad, Telangana',
    address: 'Kukatpally, Hyderabad',
    dateOfBirth: '1995-06-12',
    maritalStatus: 'Single',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 10:15:30'
  },
  {
    registrationId: 102,
    fullName: 'Aamir Khan',
    mobileNumber: '9123456789',
    email: 'aamir.khan@gmail.com',
    gender: 'Male',
    stateDistrict: 'Hyderabad, Telangana',
    address: 'Tolichowki, Hyderabad',
    dateOfBirth: '1992-03-18',
    maritalStatus: 'Married',
    registrationFees: 'unpaid',
    registeredOn: '2025-12-20 10:30:10'
  },
  {
    registrationId: 103,
    fullName: 'Sunita Reddy',
    mobileNumber: '9988776655',
    email: 'sunita.reddy@gmail.com',
    gender: 'Female',
    stateDistrict: 'Vijayawada, Andhra Pradesh',
    address: 'Benz Circle, Vijayawada',
    dateOfBirth: '1990-08-25',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 10:45:42'
  },
  {
    registrationId: 104,
    fullName: 'Imran Shaikh',
    mobileNumber: '9012345678',
    email: 'imran.shaikh@gmail.com',
    gender: 'Male',
    stateDistrict: 'Mumbai, Maharashtra',
    address: 'Andheri West, Mumbai',
    dateOfBirth: '1988-11-02',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 11:05:18'
  },
  {
    registrationId: 105,
    fullName: 'Anjali Verma',
    mobileNumber: '9090909090',
    email: 'anjali.verma@gmail.com',
    gender: 'Female',
    stateDistrict: 'Bhopal, Madhya Pradesh',
    address: 'MP Nagar, Bhopal',
    dateOfBirth: '1996-01-14',
    maritalStatus: 'Single',
    registrationFees: 'unpaid',
    registeredOn: '2025-12-20 11:20:55'
  },
  {
    registrationId: 106,
    fullName: 'Suresh Kumar',
    mobileNumber: '9845671234',
    email: 'suresh.kumar@gmail.com',
    gender: 'Male',
    stateDistrict: 'Chennai, Tamil Nadu',
    address: 'Velachery, Chennai',
    dateOfBirth: '1985-07-09',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 11:40:22'
  },
  {
    registrationId: 107,
    fullName: 'Farah Ali',
    mobileNumber: '9345612789',
    email: 'farah.ali@gmail.com',
    gender: 'Female',
    stateDistrict: 'Lucknow, Uttar Pradesh',
    address: 'Alambagh, Lucknow',
    dateOfBirth: '1994-09-30',
    maritalStatus: 'Single',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 12:00:05'
  },
  {
    registrationId: 108,
    fullName: 'Rohit Singh',
    mobileNumber: '9567891234',
    email: 'rohit.singh@gmail.com',
    gender: 'Male',
    stateDistrict: 'Jaipur, Rajasthan',
    address: 'Malviya Nagar, Jaipur',
    dateOfBirth: '1991-04-21',
    maritalStatus: 'Married',
    registrationFees: 'unpaid',
    registeredOn: '2025-12-20 12:18:49'
  },
  {
    registrationId: 109,
    fullName: 'Meena Patel',
    mobileNumber: '9871234560',
    email: 'meena.patel@gmail.com',
    gender: 'Female',
    stateDistrict: 'Ahmedabad, Gujarat',
    address: 'Navrangpura, Ahmedabad',
    dateOfBirth: '1989-12-11',
    maritalStatus: 'Married',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 12:35:16'
  },
  {
    registrationId: 110,
    fullName: 'Karthik R',
    mobileNumber: '9988123456',
    email: 'karthik.r@gmail.com',
    gender: 'Male',
    stateDistrict: 'Bengaluru, Karnataka',
    address: 'Whitefield, Bengaluru',
    dateOfBirth: '1993-05-27',
    maritalStatus: 'Single',
    registrationFees: 'paid',
    registeredOn: '2025-12-20 12:55:40'
  }
];

  searchText = '';
  showModal: boolean=false;

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    // this.loadVisitors();
  }
openAddModal() {
    this.isEditMode = false;
    this.model = {};
    this.form.reset();
    this.showModal =true
  }
  loadVisitors() {
    this.visitorService.getVisitors().subscribe(res => {
      this.members = res;
      this.filteredMembers = res;
    });
  }

  search() {
    const value = this.searchText.toLowerCase();
    this.filteredMembers = this.members.filter((m:any) =>
      m.fullName.toLowerCase().includes(value) ||
      m.mobileNumber.includes(value)
    );
  }

  addMember() {
    console.log('Add member clicked');
    // later: open modal or navigate to add page
  }
  openEditModal(member: Visitor) {
    this.isEditMode = true;
    this.model = { ...member };
    this.form.reset(this.model);
    this.showModal=true;
  }
  editMember(member: Visitor) {

    console.log('Edit', member);
  }
  save() {
    if (this.form.valid){
    if (this.isEditMode) {
      // this.visitorService.updateVisitor(this.model as Visitor)
      //   .subscribe(() => {
      //     this.loadVisitors();
      //     this.closeModal();
      //   });
    } else {
      // this.visitorService.addVisitor(this.model as Visitor)
      //   .subscribe(() => {
      //     this.loadVisitors();
      //     this.closeModal();
      //   });
    }
  }
  }
  deleteMember(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.visitorService.deleteVisitor(id).subscribe(() => {
        this.loadVisitors();
      });
    }
  }
}
