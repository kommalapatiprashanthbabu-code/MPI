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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormlyModule, FormlyBootstrapModule, RouterLink],
  standalone: true,
  templateUrl: './members.html',
  styleUrl: './members.css',
})

export class Members implements OnInit {
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedStatus: string = 'ALL';
  form = new FormGroup({});
  model: Partial<Visitor> = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row g-3',
      fieldGroup: [
        {
          key: 'scannerId',
          type: 'input',
          templateOptions: {
            label: 'Scanner ID',
            required: true,
          },
          hooks: {
            onInit: (field) => {
              const control = field.formControl;

              control?.valueChanges.subscribe(value => {
                if (!value) return;

                const match = value.match(/^MPI@2-(\d{0,3})$/);

                if (!match) {
                  // Force correct format
                  const digits = value.replace(/\D/g, '').slice(-3);
                  const formatted = `MPI@2-${digits.padStart(3, '0')}`;
                  control.setValue(formatted, { emitEvent: false });
                }
              });
            }
          }
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
    type: 'tel',
    label: 'Mobile Number',
    required: true,
    placeholder: 'Enter 10 digit mobile number',
    maxLength: 10,
    minLength: 10,
    pattern: '^[0-9]{10}$'
  },
  validation: {
    messages: {
      required: 'Mobile number is required',
      minlength: 'Mobile number must be exactly 10 digits',
      maxlength: 'Mobile number must be exactly 10 digits',
      pattern: 'Only 10 numeric digits allowed'
    }
  }
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
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  },
  validation: {
    messages: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address'
    }
  }
},
        {
          key: 'registrationFees',
          type: 'select',
          className: 'col-md-6',
          templateOptions: {
            label: 'Registration Fees',
            placeholder: 'Select an option',
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
            placeholder: 'Select an option',
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
  showModal: boolean = false;
  attendedMemCount =0;
  notAttendedMemCount=0;

  constructor(private toastr: ToastrService, private visitorService: VisitorService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadVisitors();
  }
  filterByStatus(status: string) {
    debugger
    this.selectedStatus = status;
    this.applyFilters();
  }
  applyFilters() {
    let data = [...this.members];

    // Search filter
    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      data = data.filter(m =>
        m.fullName?.toLowerCase().includes(text) ||
        m.mobileNumber?.includes(text) ||
        m.scannerId?.toLowerCase().includes(text)
      );
    }

    // Attendance filter
    if (this.selectedStatus !== 'ALL') {
      if (this.selectedStatus === 'NOT ATTENDED') {
        data = data.filter(m =>
          !m.attendanceStatus || m.attendanceStatus === 'NOT ATTENDED'
        );
      } else {
        data = data.filter(m =>
          m.attendanceStatus === 'ATTENDED'
        );
      }
    }

    this.filteredMembers = data;
  }

  openAddModal() {
    this.isEditMode = false;
    this.form.reset();
    this.model = {
      scannerId: this.generateNextScannerId()
    };
    this.showModal = true
  }

  generateNextScannerId(): string {
    if (!this.members || this.members.length === 0) {
      return 'MPI@2-001';
    }

    // Get last scannerId number
    const numbers = this.members
      .map(m => this.extractNumber(m.scannerId))
      .filter(n => !isNaN(n));

    const max = Math.max(...numbers);
    const next = max + 1;

    return `MPI@2-${next.toString().padStart(3, '0')}`;
  }

  extractNumber(id: string): number {
    if (!id) return 0;
    const parts = id.split('-');
    return Number(parts[1]) || 0;
  }
  loadVisitors() {
    this.visitorService.getVisitors().subscribe((res: any) => {
      this.members = res.content;
      this.filteredMembers = [...res.content]; // clone to avoid reference 
       this.attendedMemCount = this.members.filter(
      m => m.attendanceStatus === 'ATTENDED'
    ).length;
     this.notAttendedMemCount = this.members.filter(
      m => !m.attendanceStatus || m.attendanceStatus==="NOT ATTENDED"
    ).length;
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
    this.showModal = true;
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
          this.showModal = false;
          this.cdr.detectChanges();
        });
    } else {
      this.visitorService.addVisitor(this.model)
        .subscribe(() => {
          this.loadVisitors();
          this.showModal = false;
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
  approve(memberInfo: any) {
    this.visitorService.approveVisitor(memberInfo.scannerId)
      .subscribe(() => {
        this.toastr.success('Attendance Marked Successfully', 'Success');
        this.loadVisitors();
      });
  }
  sortByScannerId() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.filteredMembers.sort((a: any, b: any) => {

      const numA = this.extractNumber(a.scannerId);
      const numB = this.extractNumber(b.scannerId);

      return this.sortDirection === 'asc'
        ? numA - numB
        : numB - numA;
    });
  }
}
