import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSymbolDragable]'
})
export class SymbolDragableDirective {

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;
  private wrapperEle: HTMLElement;

  constructor(private elementRef: ElementRef) {
    if (this.elementRef && this.elementRef.nativeElement.parentElement) {
      this.wrapperEle = this.elementRef.nativeElement.parentElement;
    }
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  public onMouseDown(event: MouseEvent, targetElement: HTMLElement): void {
    if (!this.elementRef || !this.wrapperEle) {
        return;
    }

    event.preventDefault();
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
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    this.wrapperEle.style.top = (this.wrapperEle.offsetTop - this.pos2) + 'px';
    this.wrapperEle.style.left = (this.wrapperEle.offsetLeft - this.pos1) + 'px';
  }
}