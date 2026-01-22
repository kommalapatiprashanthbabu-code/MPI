import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VisitorService } from './members-service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { RouterLink } from '@angular/router';
import { Visitor } from '../interfaces/visitors.model';
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
          placeholder: 'Enter full name',
        },
      },
      {
        key: 'mobileNumber',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Mobile Number',
          required: true,
          placeholder: 'Enter mobile number',
        },
      },
      {
        key: 'email',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter email',
        },
      },
      {
        key: 'gender',
        type: 'select',
        className: 'col-md-6',
        templateOptions: {
          label: 'Gender',
          required: true,
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
        },
      },
      {
        key: 'dateOfBirth',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Date of Birth',
          type: 'date',
          required: true,
        },
      },
      {
        key: 'maritalStatus',
        type: 'select',
        className: 'col-md-6',
        templateOptions: {
          label: 'Marital Status',
          required: true,
          options: [
            { label: 'Married', value: 'married' },
            { label: 'Unmarried', value: 'unmarried' },
          ],
        },
      },
      {
        key: 'stateDistrict',
        type: 'input',
        className: 'col-md-12',
        templateOptions: {
          label: 'State / District',
          required: true,
          placeholder: 'Enter state and district',
        },
      },
      {
        key: 'address',
        type: 'textarea',
        className: 'col-md-12',
        templateOptions: {
          label: 'Address',
          required: true,
          placeholder: 'Enter address',
          rows: 2,
        },
      },
      {
        key: 'pinCode',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Pin Code',
          required: true,
          placeholder: 'Enter pin code',
        },
      },
      {
        key: 'registrationFees',
        type: 'select',
        className: 'col-md-6',
        templateOptions: {
          label: 'Registration Fees',
          required: true,
          options: [
            { label: 'Paid', value: 'paid' },
            { label: 'Unpaid', value: 'unpaid' },
          ],
        },
      },
    ],
  },
];



  isEditMode = false;
members: Visitor[] = [];
filteredMembers: Visitor[] = [];
  searchText = '';
  showModal: boolean=false;

  constructor(private visitorService: VisitorService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
     this.loadVisitors();
  }
openAddModal() {
    this.isEditMode = false;
    this.model = {};
    this.form.reset();
    this.showModal =true
  }


loadVisitors() {
  this.visitorService.getVisitors().subscribe((res:any) => {
    this.members = res.content;
    this.filteredMembers = [...res.content]; // clone to avoid reference 
     this.cdr.detectChanges();
  });
}


search() {
  const value = this.searchText.toLowerCase();
  this.filteredMembers = this.members.filter(m =>
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
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
    if (this.isEditMode) {
      this.visitorService.updateVisitor(this.model)
        .subscribe(() => {
          this.loadVisitors();
           this.showModal=false;
        });
    } else {
      this.visitorService.addVisitor(this.model)
        .subscribe(() => {
          this.loadVisitors();
         this.showModal=false;
        });
    }
  
  }
  deleteMember(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.visitorService.deleteVisitor(id).subscribe(() => {
        this.loadVisitors();
      });
    }
  }
  approve(memberInfo:any){
     this.visitorService.approveVisitor({qrScanned:false,registrationId:memberInfo.registrationId})
        .subscribe(() => {
          this.loadVisitors();
    });
  }
}
