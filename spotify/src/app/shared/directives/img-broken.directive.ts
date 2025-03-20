import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg:string | boolean = false
  @HostListener('error') handleError():void {
    const elNative = this.elHost.nativeElement
    console.log('🔴 Esta imagen no está disponible -->', this.elHost);
    if (this.customImg){
      elNative.src = this.customImg
    }else{
      elNative.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAAD9JREFUGFd1jCESwAAIw6hD4/j/d3gDEhwa1x3Tm+sluSIiaGaiqrK7MjOCzOQNd5fulgtQVST5ghMAfsqvzwcpUS+vZ4PsVwAAAABJRU5ErkJggg=='
    }
  }
  constructor(private elHost: ElementRef) {
    console.log(this.elHost);
   }

}
