import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import QRCodeStyling from 'qr-code-styling';
@Component({
  selector: 'app-home',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
@ViewChild('qrContainer', { static: true })
  qrContainer!: ElementRef<HTMLDivElement>;

  qrData = 'Mssion_Peace_India';
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
    this.qrGenerated = true;
    this.qrContainer.nativeElement.innerHTML = '';

    this.qrCode.update({
      data: this.qrData
    });

    this.qrCode.append(this.qrContainer.nativeElement);
  }

  downloadSVG() {
    this.qrCode.download({
      name: 'mission-peace-india-qr',
      extension: 'svg'
    });
  }

  downloadPNG() {
    this.qrCode.download({
      name: 'mission-peace-india-qr',
      extension: 'png'
    });
  }
}
