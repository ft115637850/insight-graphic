import { Directive, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { CardSize } from '../interfaces/card-size.data';

@Directive({
  selector: '[appCardResizable]'
})
export class CardResizableDirective {
  @Output()
  public cardResized = new EventEmitter<CardSize>();
  constructor(private elementRef: ElementRef) {}
  @HostListener('mousedown', ['$event', '$event.target'])
  public onMouseDown(event: MouseEvent, targetElement: HTMLElement): void {
    if (!this.elementRef || targetElement !== this.elementRef.nativeElement) {
        return;
    }

    document.onmouseup = this.closeDragElement.bind(this);
  }

  private closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    const newWidth = this.elementRef.nativeElement.offsetWidth;
    const newHeight = this.elementRef.nativeElement.offsetHeight;

    this.cardResized.emit({width: newWidth, height: newHeight, cardId: ''});
  }
}
