import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-loader',
  templateUrl: './img-loader.component.html',
  styleUrls: ['./img-loader.component.scss'],
})
export class ImgLoaderComponent implements OnInit {
  @ViewChild('canvas') canvas;

  @Input() canEdit:boolean;
  @Input() image:string;
  @Output() imageChange = new EventEmitter<string>();

  reader = new FileReader();
  maxWidth = 400;
  maxHeight = 400;

  constructor() { }

  ngOnInit() {
    if(this.canEdit){

      this.reader.onload = (url: any) => {
        const resizeElement = this.canvas.nativeElement;
        
        let image = new Image();
        
        image.src = url.target.result;
        image.onload = () => {
          let width = image.width;
          let height = image.height;
          
          // // calculate the width and height, constraining the proportions
          if (width > height) {
            if (width > this.maxWidth) {
              height = Math.round(height *= this.maxWidth / width);
              width = this.maxWidth;
            }
          } else {
            if (height > this.maxHeight) {
              width = Math.round(width *= this.maxHeight / height);
              height = this.maxHeight;
            }
          }
            
            
          // // resize the canvas and draw the image data into it
          resizeElement.width = width;
          resizeElement.height = height;

          let ctx = resizeElement.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);
          
          let src = resizeElement.toDataURL("image/jpeg");
          
          this.image = src;
          this.imageChange.emit(src);
          
        };
      };
    }
  }
  
  onFileSelected(event) {
    if (event.target.files.length) {
      this.reader.readAsDataURL(event.target.files[0]);
    }
  }
}
