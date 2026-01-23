import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VisitorService } from './members-service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { RouterLink } from '@angular/router';
import { Visitor } from '../interfaces/visitors.model';
import { ToastrService } from 'ngx-toastr';
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
        key: 'scannerId',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Scanner Id',
          required: true,
          placeholder: 'Enter Scanner ID',
        },
      },
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
        key: 'registrationFees',
        type: 'select',
        className: 'col-md-6',
        templateOptions: {
          label: 'Registration Fees',
          placeholder:'Select an option',
          required: true,
          options: [
            { label: 'PAID', value: 'PAID' },
            { label: 'UNPAID', value: 'UNPAID' },
          ],
        },
      },
      {
        key: 'attendanceStatus',
        type: 'select',
        className: 'col-md-6',
        templateOptions: {
          label: 'Attendance Status',
          placeholder:'Select an option',
          required: true,
          options: [
            { label: 'ATTENDED', value: 'ATTENDED' },
            { label: 'NOT ATTENDED', value: 'NOT ATTENDED' },
          ],
        },
      },
      {
        key: 'registrationNumber',
        type: 'input',
        className: 'col-md-6',
        templateOptions: {
          label: 'Registration Number',
          required: false,
          placeholder: 'Enter',
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

  constructor(private toastr: ToastrService,private visitorService: VisitorService,private cdr: ChangeDetectorRef) {}

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
    m.fullName.toLowerCase().includes(value) || m.scannerId.toLowerCase().includes(value) || m.mobileNumber.includes(value)
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
           this.cdr.detectChanges();
        });
    } else {
      this.visitorService.addVisitor(this.model)
        .subscribe(() => {
          this.loadVisitors();
         this.showModal=false;
         this.cdr.detectChanges();
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
    this.visitorService.approveVisitor(memberInfo.scannerId)
        .subscribe(() => {
           this.toastr.success('Approved Successfully', 'Success');
          this.loadVisitors();
    });
  }
}
