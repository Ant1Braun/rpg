import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { merge, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-characteristic-builder',
  templateUrl: './characteristic-builder.component.html',
  styleUrls: ['./characteristic-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacteristicBuilderComponent implements OnInit, OnDestroy {
  levelCtrls?: FormControl[];
  nameCtrls?: FormControl[];
  private destroyed$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      max: number,
      min: number,
      groups: FormGroup[],
    },
    private dialogRef: MatDialogRef<CharacteristicBuilderComponent>
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.levelCtrls = this.data.groups.map(g => g.get('level') as FormControl);
    this.nameCtrls = this.data.groups.map(g => g.get('name') as FormControl);
    merge(...this.levelCtrls.map(ctrl => ctrl.valueChanges.pipe(
      tap(value => {
        if (value > this.data.max) {
          ctrl.patchValue(this.data.max);
        }
        if (value < this.data.min) {
          ctrl.patchValue(this.data.min);
        }
      }),
      takeUntil(this.destroyed$)
    ))).pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getLevelCtrl(group: FormGroup): FormControl {
    console.log('eaz')
    return group.get('level') as FormControl;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

