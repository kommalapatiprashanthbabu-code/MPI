import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VisitorService } from '../members/members-service';
import { Visitor } from '../interfaces/visitors.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-members-attended',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './members-attended.html',
  styleUrl: './members-attended.css',
})
export class MembersAttended implements OnInit {
  attendedMembers: Visitor[] = [];
  filteredAttendedMembers: Visitor[] = [];
  searchText = '';
  constructor(private visitorService:VisitorService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
     this.loadAttendedVisitors();
  }
  loadAttendedVisitors() {
  this.visitorService.getAttendedVisitors().subscribe((res:any) => {
    this.attendedMembers = res.content;
    this.filteredAttendedMembers = [...res.content]; // clone to avoid reference 
     this.cdr.detectChanges();
  });
}
search() {
  const value = this.searchText.toLowerCase();
  this.filteredAttendedMembers = this.attendedMembers.filter(m =>
    m.fullName.toLowerCase().includes(value) ||
    m.mobileNumber.includes(value)
  );
}
}
