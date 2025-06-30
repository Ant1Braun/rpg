import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[inputNumber]',
    standalone: false
})
export class InputNumber {
    @Input() max!: number;
    @Input() min!: number;
    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'End', 'Home', 'Backspace', 'Delete'].some(key => event.key === key)) {
            return;
        }
        if (!/^\d+$/.test(event.key)) {
            event.preventDefault();
        }
    }
}
