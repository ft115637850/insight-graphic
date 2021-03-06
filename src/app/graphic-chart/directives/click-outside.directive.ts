import { Directive, ElementRef, Input, Output, EventEmitter, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit {
  @Input()
  public exemptSelector: string;
  @Output()
  public appClickOutside = new EventEmitter<MouseEvent>();
  private exemptionList: HTMLCollectionOf<Element>;
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (this.exemptSelector) {
      this.exemptionList = document.getElementsByClassName(this.exemptSelector);
    }
  }

  @HostListener('document:mousedown', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    if (this.exemptionList && this.exemptionList.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.exemptionList.length; i++) {
        if (this.isClickInArea(this.exemptionList[i], event)) {
          return;
        }

        if (this.exemptionList[i].contains(targetElement)) {
          return;
        }
      }
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }

  private isClickInArea(element: Element, event: MouseEvent): boolean {
    const area = element.getBoundingClientRect();
    if (event.clientX > area.left && event.clientX < area.right &&
      event.clientY > area.top && event.clientY < area.bottom) {
      return true;
    }
    return false;
  }
}
