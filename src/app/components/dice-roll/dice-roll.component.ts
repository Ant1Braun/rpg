import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { flatten } from 'lodash';
import { EDiceColor, EDiceSymbol, ERollState } from '../../enums';
import { IDice, IFace } from '../../interfaces';
import { trigger, state, style, transition, animate, sequence, group, animateChild, query } from '@angular/animations';
import { WhiteDice, RedDice, PurpleDice, BlueDice, GreenDice, YellowDice, OrangeDice } from './constants';
import { MatBadge } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';


const defaultDices: IDice[] = [
  WhiteDice,
  RedDice,
  PurpleDice,
  BlueDice,
  GreenDice,
  YellowDice,
  OrangeDice
];

@Component({
    selector: 'app-dice-roll',
    templateUrl: './dice-roll.component.html',
    styleUrls: ['./dice-roll.component.scss'],
    animations: [
        trigger('bounceDice', [
            state('default', style({ transform: 'translateY(0)' })),
            state('rolling', style({ transform: 'translateY(360deg)' })),
            transition('default <=> rolling', [
                group([
                    sequence([
                        style({ transform: 'translateY(0)' }),
                        animate('400ms cubic-bezier(0,0,0,1)', style({ transform: 'translateY(-70px)' })),
                        animate('300ms cubic-bezier(1,0,1,1)', style({ transform: 'translateY(0)' })),
                        animate('200ms cubic-bezier(0,0,0,1)', style({ transform: 'translateY(-35px)' })),
                        animate('150ms cubic-bezier(1,0,1,1)', style({ transform: 'translateY(0)' })),
                        animate('100ms cubic-bezier(0,0,0,1)', style({ transform: 'translateY(-12px)' })),
                        animate('80ms cubic-bezier(1,0,1,1)', style({ transform: 'translateY(0)' }))
                    ]),
                    query('@rotateDice', animateChild()),
                ])
            ])
        ]),
        trigger('rotateDice', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rolling', style({ transform: 'rotate(360deg)' })),
            transition('default <=> rolling', [
                animate('1230ms ease-in-out')
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule,
      TranslatePipe,
      MatBadge,
      MatTooltip,
      MatButtonModule
    ]
})
export class DiceRollComponent implements OnInit {
  results: IFace[] = [];
  dices: IDice[] = [];
  defaultDices = defaultDices.sort((a, b) => a.order - b.order);
  rollCount = 0;
  advantageLength = 0;
  successLength = 0;
  criticalLength = 0;
  positiveLength = 0;
  rollState = ERollState.default;
  roll = false;
  readonly EDiceSymbol = EDiceSymbol;
  readonly EDiceColor = EDiceColor;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { dices: IDice[] },
    private dialogRef: MatDialogRef<DiceRollComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.setDefaultDices();
    this.results = flatten(this.dices.map(d => {
      return {
        symbols: [],
        color: d.color
      };
    }));
  }

  getColorClass(color?: EDiceColor): { [key in EDiceColor]?: boolean } | undefined {
    if (!color) {
      return;
    }
    return { [color]: true };
  }

  getImgClass(length: number): string {
    if (length > 1) {
      return 'dice_results';
    }
    return 'dice_result';
  }

  getDiceNumberById(id: string): number {
    return this.dices.filter(e => e.id === id).length;
  }

  rollDices(): void {
    this.rollState = ERollState.rolling;
    this.advantageLength = 0;
    this.successLength = 0;
    this.criticalLength = 0;
    this.rollCount++;
    setTimeout(() => {
      this.results = this.getRandomFaces(this.dices.sort((a, b) => a.order < b.order ? -1 : 0));
      this.rollState = ERollState.default;
      this.computeDelta();
      this.cdr.detectChanges();
    }, 1230);
  }

  computeDelta(): void {
    this.advantageLength = flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.advantage)?.length
      - flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.disadvantage)?.length;
    this.successLength = flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.success)?.length
      - flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.fail)?.length;
    this.criticalLength = flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.critical)?.length
      - flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.anti_critical)?.length;
    this.positiveLength = flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.positive)?.length
      - flatten(this.results?.map(r => r.symbols)).filter((s: EDiceSymbol) => s === EDiceSymbol.negative)?.length;
  }

  private getRandomFaces(dices: IDice[]): IFace[] {
    return dices.map(dice => {
      const face = dice.faces[Math.floor(Math.random() * dice.faces.length)];
      return {
        ...face,
        color: dice.color
      };
    });
  }

  addDice(d: IDice): void {
    this.dices.push(d);
    this.results.push({
      symbols: [],
      color: d.color
    });
  }

  private setDefaultDices(): void {
    this.dices = [...this.data.dices];
  }

  closeDialog(): void {
    this.dialogRef.close(this.rollCount);
  }
}

