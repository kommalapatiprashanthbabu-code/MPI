import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorService } from '../members/members-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private cdr: ChangeDetectorRef, private visitorService: VisitorService) { }

  ngOnInit() {
     setTimeout(() => {
        this.qrInput.nativeElement.focus();
      }, 0);
   }

  onQrScanned(scannedValue: string) {
    const result = JSON.parse(scannedValue);
    this.scannedResult = result;
    this.visitorService.getVisitorById(this.scannedResult.serialNo).subscribe(visitor => {
      this.memberInfo = visitor;
      this.showDetailsModal = true;
      this.cdr.detectChanges();
    });
  }

  approve() {
    this.visitorService.approveVisitor({ qrScanned: true, registrationId: this.scannedResult.serialNo })
      .subscribe(() => {
        this.closeDetailsModal();
      });
  }
  closeDetailsModal() {
    this.showDetailsModal = false;
     setTimeout(() => {
        this.qrInput.nativeElement.focus();
      }, 0);
  }
  updateFeesStatus() {
    this.visitorService.updateVisitor({ registrationId: this.scannedResult.serialNo, registrationFees: this.memberInfo.registrationFees })
      .subscribe(() => {
        //  this.showDetailsModal=false;
        // this.startScanner();
      });
  }
}
