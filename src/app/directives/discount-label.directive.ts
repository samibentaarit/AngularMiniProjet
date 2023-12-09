// discount-label.directive.ts

import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDiscountLabel]'
})
export class DiscountLabelDirective implements OnInit {
  @Input() price: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateDiscountLabel();
  }

  private updateDiscountLabel() {
    if (this.price > 300) {
      this.renderer.addClass(this.el.nativeElement, 'discount-label');
      this.renderer.setProperty(this.el.nativeElement, 'textContent', 'Remise par 10%');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'discount-label');
      this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
    }
  }
}
