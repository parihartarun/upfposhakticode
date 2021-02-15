import {
    A,
    Z,
} from '@angular/cdk/keycodes';
import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    OnInit,
    Renderer2,
    Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[appUppercase]',
    host: {
        '(input)': '$event'
      },
    
})
export class UppercaseDirective {

    lastValue: string;

    constructor(public ref: ElementRef) { }

    @HostListener('input', ['$event']) onInput($event) {
        var start = $event.target.selectionStart;
        var end = $event.target.selectionEnd;
        $event.target.value = $event.target.value.toUpperCase();
        $event.target.setSelectionRange(start, end);
        $event.preventDefault();

        if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
            this.lastValue = this.ref.nativeElement.value = $event.target.value;
            // Propagation
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
        }
    }
}
