import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './scanner.html',
  styleUrls: ['./scanner.css'],
})
export class Scanner implements OnInit, OnDestroy {
  html5QrCode!: Html5Qrcode;

  cameras: { id: string; label: string }[] = [];
  selectedCameraId!: string;

  scannedResult: string | null = null;
  memberInfo: any;
  showDetailsModal: boolean =false;

  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}

async ngOnInit() {
  this.html5QrCode = new Html5Qrcode('qr-reader');

  const cams = await Html5Qrcode.getCameras();

  if (!cams || cams.length === 0) {
    alert('No cameras found');
    return;
  }

  // 🔥 FORCE Angular to update UI
  this.cameras = cams;
  this.selectedCameraId = cams[0].id;

  this.cdr.detectChanges(); // ✅ THIS IS THE KEY

  await this.startScanner();
}



  async startScanner() {
    if (this.html5QrCode.isScanning) {
      await this.html5QrCode.stop();
    }

    await this.html5QrCode.start(
      this.selectedCameraId,
      { fps: 10, qrbox: 250 },
      (decodedText) => this.onScanSuccess(decodedText),
      () => {}
    );
  }

async onCameraChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  this.selectedCameraId = select.value;
  await this.startScanner();
}



onScanSuccess(text: string) {
  this.scannedResult = text;
  this.memberInfo = { name: 'John Doe', id: text };

  this.showDetailsModal = true;
  this.cdr.detectChanges(); // 👈 force update

  this.html5QrCode.stop();
}


async ngOnDestroy() {
  await this.stopScanner();
}
private async stopScanner() {
  if (this.html5QrCode) {
    try {
      if (this.html5QrCode.isScanning) {
        await this.html5QrCode.stop();
      }
      await this.html5QrCode.clear(); // 🔥 VERY IMPORTANT
    } catch (err) {
      console.warn('Error stopping scanner', err);
    }
  }
}

  approve(){
    this.showDetailsModal=false;
  }
  closeDetailsModal(){
    this.showDetailsModal=false;
    this.startScanner();
  }
}
