import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import QRCodeStyling from 'qr-code-styling';
@Component({
  selector: 'app-home',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
@ViewChild('qrContainer') qrContainer!: ElementRef<HTMLDivElement>;
@ViewChild('downloadWrapper') downloadWrapper!: ElementRef<HTMLDivElement>;
constructor(private cdr:ChangeDetectorRef){

}

  qrPayload = {
  name: '',
  serialNo: ''
};
displayName = '';
displaySerialNo = '';

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
  if(this.qrPayload.name && this.qrPayload.serialNo){
  this.qrGenerated = true;

  const payload = {
    name: this.qrPayload.name,
    serialNo: this.qrPayload.serialNo
  };

  this.displayName = payload.name;
  this.displaySerialNo = payload.serialNo;

  // ⏳ Wait for DOM to render
  setTimeout(() => {
    this.qrContainer.nativeElement.innerHTML = '';

    this.qrCode.update({
      data: JSON.stringify(payload)
    });

    this.qrCode.append(this.qrContainer.nativeElement);
  });
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
    serialNo: ''
  };

  // Reset display text
  this.displayName = '';
  this.displaySerialNo = '';

  // Let Angular destroy the whole block
  this.qrGenerated = false;
  this.cdr.detectChanges();
}


}
