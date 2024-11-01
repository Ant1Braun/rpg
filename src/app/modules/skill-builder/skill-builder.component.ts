import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, first, take, takeUntil } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';
import { ISkill } from '../../interfaces';
import { DiceRollComponent } from '../dice-roll/dice-roll.component';
import { defaultDicesByLevel, defaultSkills } from './constants';


@Component({
  selector: 'app-skill-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillBuilderComponent implements OnInit, OnDestroy {
  skillList?: ISkill[];
  form?: FormGroup;
  @HostListener('window:beforeunload', ['event'])
  do(event: any) {
    if (this.unsaved) {
      event.returnValue = '';
    }
  }
  readonly defaultLevel = 20;
  readonly maxLevel = 200;
  readonly minLevel = 0;

  private unsaved = false;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.skillList = defaultSkills;
    const formGroups = this.getFormGroupsFromSkills(defaultSkills);

    this.form = this.fb.group({
      skills: this.fb.array(formGroups),
      fileName: this.fb.control(''),
      autoPex: this.fb.control(true)
    });
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.unsaved = true;
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get skillsArray(): FormArray {
    return (this.form?.get('skills') as FormArray);
  }

  get experience(): number {
    return this.skillsArray.value?.reduce((a: number, b: ISkill) => a + b.level - this.defaultLevel, this.minLevel);
  }

  get skillGroups(): FormGroup[] {
    return this.skillsArray?.controls as FormGroup[];
  }

  get fileName(): FormControl {
    return this.form?.get('fileName') as FormControl;
  }

  get autoPex(): FormControl {
    return this.form?.get('autoPex') as FormControl;
  }

  getLevelCtrl(skillGroup: FormGroup): FormControl {
    return skillGroup.get('level') as FormControl;
  }

  private getFormGroupsFromSkills(skills: ISkill[]): FormGroup[] {
    return skills.map(skill => {
      return this.fb.group({
        name: this.fb.control(skill.name),
        level: this.fb.control(skill.level, Validators.max(this.maxLevel))
      });
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }
    const file = files[0];
    const fileName = file.name?.split('.')?.shift();
    this.fileName.setValue(fileName);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const wb = read(e.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const newSkills: ISkill[] = rows.map(row => {
          const max = +(row as any)?.max;
          const min = +(row as any)?.min;
          return {
            id: '' + (row as any)?.id,
            level: +(row as any)?.level || this.defaultLevel,
            max: (max > this.maxLevel ? this.maxLevel : max) ?? this.maxLevel,
            min: (min < this.minLevel ? this.minLevel : min) ?? this.minLevel,
            name: '' + (row as any)?.name
          }
        });
        this.skillsArray.clear();
        this.getFormGroupsFromSkills(newSkills).forEach(group => this.skillsArray.push(group));
        this.cdr.detectChanges();
      }
    }
    reader.readAsArrayBuffer(file);
  }

  onExportClicked(): void {
    const headings = [[
      'name',
      'level'
    ]];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.skillsArray.value, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `${this.fileName.value || 'skills'}.xlsx`);
    this.unsaved = false;
    this.form?.markAsPristine();
  }

  onDeleteClicked(index: number): void {
    this.skillsArray.removeAt(index)
  }

  onChangeLevelClicked(control: AbstractControl, change: number): void {
    if (!control) {
      return;
    }
    control.setValue(control.value + change);
    if (control.pristine) {
      control.markAsDirty();
    }
  }

  onAddNewSkillClicked(): void {
    this.skillsArray.push(this.fb.group({
      name: this.fb.control(''),
      level: this.fb.control(this.defaultLevel)
    }))
  }

  onRollDicesClicked(levelCtrl: FormControl): void {
    const dices = defaultDicesByLevel.find(d => levelCtrl.value <= d.max && levelCtrl.value >= d.min)?.dices;
    if (!dices) {
      return;
    }
    const dialogRef = this.dialog.open(DiceRollComponent, {
      data: { dices },
      panelClass: 'roll-dice-dialog'
    });
    if (!this.autoPex.value) {
      return;
    }
    const closed$ = new Subject<boolean>();
    dialogRef.backdropClick().pipe(take(1), takeUntil(closed$)).subscribe(() => dialogRef.componentInstance.closeDialog());
    dialogRef.afterClosed().pipe(first()).subscribe((rollCount: number) => {
      const newLevel = levelCtrl.value + rollCount;
      if (levelCtrl.value !== this.maxLevel) {
        if (newLevel > this.maxLevel) {
          levelCtrl.setValue(this.maxLevel);
        } else {
          levelCtrl.setValue(newLevel);
        }
      }
      closed$.next(true);
      closed$.complete();
    });
  }
}
