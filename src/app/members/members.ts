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
  members:any = [];
  filteredMembers: any= [];
  searchText = '';
  showModal: boolean=false;

  constructor(private visitorService: VisitorService) {}

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
