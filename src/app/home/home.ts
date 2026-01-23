import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as htmlToImage from 'html-to-image';
import QRCodeStyling from 'qr-code-styling';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
@ViewChild('qrContainer', { static: false })
qrContainer!: ElementRef<HTMLDivElement>;

@ViewChild('downloadWrapper', { static: false })
downloadWrapper!: ElementRef<HTMLDivElement>;

constructor(private cdr:ChangeDetectorRef){

}

  qrPayload = {
  name: '',
  scannerId: ''
};
displayName = '';
displayScannerId = '';

  qrGenerated = false;

  qrCode = new QRCodeStyling({
    width: 800,
    height: 800,
    margin: 50,
    type: 'svg',
    data: '',
    image: 'assets/images/white-bg-logo.jpeg',
    qrOptions: {
      errorCorrectionLevel: 'H'
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.50
    },
    dotsOptions: {
      color: '#000000',
      type: 'square'
    },
    backgroundOptions: {
      color: '#ffffff'
    }
  });

generateQR() {
  if(this.qrPayload.name && this.qrPayload.scannerId){
  this.qrGenerated = true;

  const payload = {
    name: this.qrPayload.name,
    scannerId: this.qrPayload.scannerId
  };

  this.displayName = payload.name;
  this.displayScannerId = payload.scannerId;
 // 🔑 Force view update
    this.cdr.detectChanges();
  // ⏳ Wait for DOM to render
  setTimeout(() => {
    this.qrContainer.nativeElement.innerHTML = '';

    this.qrCode.update({
      data: JSON.stringify(payload)
    });

    this.qrCode.append(this.qrContainer.nativeElement);
  },100);
}
}
downloadPNG() {
  htmlToImage.toPng(this.downloadWrapper.nativeElement,{skipFonts: true,cacheBust: true})
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = this.qrPayload.name+'-MPI-entry-pass.png';
      link.href = dataUrl;
      link.click();
      this.resetQR();
    });
}
resetQR() {
  // Reset model
  this.qrPayload = {
    name: '',
    scannerId: ''
  };

  // Reset display text
  this.displayName = '';
  this.displayScannerId = '';

  // Let Angular destroy the whole block
  this.qrGenerated = false;
  this.cdr.detectChanges();
}

async onExcelUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Remove header row (if exists)
  const members = rows.slice(1).filter(r => r[0] && r[1]);

  for (const row of members) {
    const serialNo = String(row[0]).trim();
    const name = String(row[1]).trim();

    await this.generateAndDownloadFromExcel(name, serialNo);
  }

  // reset file input
  event.target.value = '';
}
generateAndDownloadFromExcel(name: string, serialNo: string): Promise<void> {
  return new Promise((resolve) => {

    // reuse existing payload logic
    this.qrPayload.name = name;
    this.qrPayload.scannerId = serialNo;

    this.generateQR();

    setTimeout(() => {
      htmlToImage
        .toPng(this.downloadWrapper.nativeElement, {
          skipFonts: true,
          cacheBust: true
        })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${name}-MPI-entry-pass.png`;
          link.href = dataUrl;
          link.click();

          this.resetQR();
          resolve();
        });
    }, 600); // wait for QR render
  });
}

}
