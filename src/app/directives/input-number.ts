import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[inputNumber]'
})
export class InputNumber {
    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'End', 'Home'].some(key => event.key === key)) {
            return;
        }
        if (!/^\d+$/.test(event.key)) {
            event.preventDefault();
        }
    }
}
