import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSymbolResizable]'
})
export class SymbolResizableDirective {

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;
  private svgEle: SVGElement;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  public onMouseDown(event: MouseEvent, targetElement: HTMLElement): void {
    if (!this.elementRef) {
        return;
    }
    if (!this.svgEle) {
      this.svgEle = targetElement.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'svg')[0];
    }

    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    const x = event.offsetX;
    const y = event.offsetY;
    if (x < width - 17 || y < height - 17) {
        return;
    }

    // e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = event.clientX;
    this.pos4 = event.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag.bind(this);
  }

  private closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  private elementDrag(e: MouseEvent) {
    // e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    // set the svg's new scale:
    this.svgEle.style.setProperty('width', `${this.elementRef.nativeElement.offsetWidth - this.pos1 - 5}px`);
    this.svgEle.style.setProperty('height', `${this.elementRef.nativeElement.offsetHeight - this.pos2 - 5}px`);
  }

}
