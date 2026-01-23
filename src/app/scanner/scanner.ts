import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorService } from '../members/members-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './scanner.html',
  styleUrls: ['./scanner.css'],
})
export class Scanner {
@ViewChild('qrInput') qrInput!: ElementRef<HTMLInputElement>;
  scannedResult: any;
  memberInfo: any;
  showDetailsModal: boolean = false;

  constructor(private toastr: ToastrService,private cdr: ChangeDetectorRef, private visitorService: VisitorService) { }

  ngOnInit() {
     setTimeout(() => {
        this.qrInput.nativeElement.focus();
      }, 0);
   }

  onQrScanned(scannedValue: string) {
    const result = JSON.parse(scannedValue);
    this.scannedResult = result;
    this.visitorService.getVisitorById(this.scannedResult.scannerId).subscribe(visitor => {
      this.memberInfo = visitor;
      this.showDetailsModal = true;
      this.cdr.detectChanges();
    });
  }

  approve() {
    this.visitorService.approveVisitor(this.scannedResult.scannerId)
      .subscribe(() => {
         this.toastr.success('Approved Successfully', 'Success');
        this.closeDetailsModal();
      });
  }
  closeDetailsModal() {
    this.showDetailsModal = false;
     setTimeout(() => {
        this.qrInput.nativeElement.focus();
      }, 0);
      this.cdr.detectChanges();
  }
  updateFeesStatus() {
    this.visitorService.updateVisitor({ scannerId: this.scannedResult.scannerId, registrationFees: this.memberInfo.registrationFees })
      .subscribe(() => {
        //  this.showDetailsModal=false;
        // this.startScanner();
      });
  }
}
