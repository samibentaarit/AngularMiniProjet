import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDarkTheme]'
})
export class DarkThemeDirective implements OnInit {
  @Input('appDarkTheme') theme: string; // Input property to receive the theme

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.applyTheme();
  }
  
  private applyTheme() {
    // Remove existing classes to ensure a clean switch
    this.renderer.removeClass(this.el.nativeElement, 'thead-light');
    this.renderer.removeClass(this.el.nativeElement, 'thead-dark');

    // Implement the logic to apply the theme based on this.theme
    if (this.theme === 'dark') {
      // Apply dark theme styles
      this.renderer.addClass(this.el.nativeElement, 'thead-dark');
    } else {
      // Apply light theme styles
      this.renderer.addClass(this.el.nativeElement, 'thead-light');
    }
  }
}