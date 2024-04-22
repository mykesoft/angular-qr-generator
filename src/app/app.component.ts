import { Component } from '@angular/core';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import html2canvas from 'html2canvas';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faCopy = faCopy;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  urlValue = '';
  qrValue = '';
  imageBase64 = '';
  
  isQrGenerated = false;

  async GenerateQr() {
    console.log(this.urlValue);
    this.qrValue = this.urlValue;
    await new Promise((f) => setTimeout(f, 1));
    const qrImageElement = document.getElementsByTagName('img')[0]; //as for me there is only one img tag in my view.
    this.imageBase64 = qrImageElement.src; //base64 data is inside the image element.
    this.isQrGenerated = true;
  }

  copyQrCodeImage(){
    html2canvas(document.getElementsByTagName('img')[0]).then(function(canvas) {
      canvas.toBlob(function(blob) {
        navigator.clipboard
          .write([
            new ClipboardItem(
              Object.defineProperty({}, blob!.type, {
                value: blob,
                enumerable: true
              })
            )
          ])
          .then(function() {
              // do something
          });
      });
    });
  }
}