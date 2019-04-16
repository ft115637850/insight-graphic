import { Directive, ElementRef, HostListener, EventEmitter, Output, Input, NgZone } from '@angular/core';
import { SymbolPosition } from '../interfaces/symbol-position.data';

@Directive({
  selector: '[appSymbolDragable]'
})
export class SymbolDragableDirective {
  @Input()
  public dragBoundarySelector: string;
  @Input()
  public disableDrag: boolean;
  @Output()
  public symbolMoved = new EventEmitter<SymbolPosition>();
  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;
  private wrapperEle: HTMLElement;
  private boundaryEle: HTMLElement;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    if (this.elementRef && this.elementRef.nativeElement.parentElement) {
      this.wrapperEle = this.elementRef.nativeElement.parentElement;
    }
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  public onMouseDown(event: MouseEvent, targetElement: HTMLElement): void {
    if (this.disableDrag || !this.elementRef || !this.wrapperEle) {
        return;
    }

    event.preventDefault();
    if (!this.boundaryEle) {
      this.ngZone.runOutsideAngular(() => {
        this.boundaryEle = this.getBoundaryElement();
      });
    }

    // get the mouse cursor position at startup:
    this.pos3 = event.clientX;
    this.pos4 = event.clientY;
    document.onmouseup = this.closeDragElement.bind(this);
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag.bind(this);
  }

  private closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    const newLeft = parseFloat(this.wrapperEle.style.left.substr(0, this.wrapperEle.style.left.length - 2));
    const newTop = parseFloat(this.wrapperEle.style.top.substr(0, this.wrapperEle.style.top.length - 2));
    this.symbolMoved.emit({symbolId: '', positionX: newLeft, positionY: newTop});
  }

  private elementDrag(e: MouseEvent) {
    e.preventDefault();
    this.ngZone.runOutsideAngular(() => {
      const boundary = this.boundaryEle.getBoundingClientRect();
      if (e.clientX < boundary.left || e.clientX > boundary.right || e.clientY < boundary.top || e.clientY > boundary.bottom) {
        return;
      }
      const wrapper = this.wrapperEle.getBoundingClientRect();

      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      // TO DO: coerce position
      let newTop = this.wrapperEle.offsetTop - this.pos2 > 0 ? this.wrapperEle.offsetTop - this.pos2 : 0;
      let newLeft = this.wrapperEle.offsetLeft - this.pos1 > 0 ? this.wrapperEle.offsetLeft - this.pos1 : 0;
      newTop = newTop > boundary.height - wrapper.height ? boundary.height - wrapper.height : newTop;
      newLeft = newLeft > boundary.width - wrapper.width ? boundary.width - wrapper.width : newLeft;

      this.wrapperEle.style.top = newTop + 'px';
      this.wrapperEle.style.left = newLeft + 'px';
    });
  }

  private getBoundaryElement() {
    const selector = this.dragBoundarySelector;
    return selector ? this.getClosestMatchingAncestor(this.elementRef.nativeElement, selector) : null;
  }

  private getClosestMatchingAncestor(element: HTMLElement, selector: string) {
    let currentElement = element.parentElement as HTMLElement | null;
    while (currentElement) {
      // IE doesn't support `matches` so we have to fall back to `msMatchesSelector`.
      if (currentElement.matches ? currentElement.matches(selector) :
          (currentElement as any).msMatchesSelector(selector)) {
        return currentElement;
      }
      currentElement = currentElement.parentElement;
    }
    return null;
  }
}
