import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, first, take, takeUntil } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';
import { ICharacteristic, IDice, ISkill } from '../../interfaces';
import { DiceRollComponent } from '../dice-roll/dice-roll.component';
import { defaultSkills } from './constants';
import { ECharacteristic } from 'src/app/enums';
import { GreenDice, YellowDice } from '../dice-roll/constants';
import { CharacteristicBuilderComponent } from '../characteristic-builder/characteristic-builder.component';
import { uniqBy } from 'lodash';


@Component({
  selector: 'app-skill-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillBuilderComponent implements OnInit, OnDestroy {
  characteristicList?: ICharacteristic[];
  form?: FormGroup;
  @HostListener('window:beforeunload', ['event'])
  do(event: any) {
    if (this.unsaved) {
      event.returnValue = '';
    }
  }
  readonly defaultSkillLevel = 0;
  readonly maxSkillLevel = 100;
  readonly minSkillLevel = 0;
  readonly defaultCharacteristicLevel = 1
  readonly maxCharacteristicLevel = 5;
  readonly minCharacteristicLevel = 1
  readonly characteristics = Object.values(ECharacteristic);

  private unsaved = false;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const characteristicList = this.characteristics.map(characteristic => ({
      name: characteristic,
      level: this.defaultCharacteristicLevel,
      max: this.maxCharacteristicLevel,
      min: this.minCharacteristicLevel
    }));
    this.characteristicList = characteristicList;
    this.form = this.fb.group({
      skills: this.fb.array(this.getFormGroupsFromSkills(defaultSkills)),
      fileName: this.fb.control(''),
      autoPex: this.fb.control(true),
      characteristics: this.fb.array(this.getFormGroupsFromCharacteristics(characteristicList))
    });
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.unsaved = true;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get skillsArray(): FormArray {
    return (this.form?.get('skills') as FormArray);
  }

  get characteristicsArray(): FormArray {
    return (this.form?.get('characteristics') as FormArray);
  }

  get experience(): number {
    return this.skillsArray.value?.reduce((a: number, b: ISkill) => a + b.level - this.defaultSkillLevel, this.minSkillLevel);
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

  getSkillLevelCtrl(skillGroup: FormGroup): FormControl {
    return skillGroup.get('level') as FormControl;
  }

  getSkillCharacteristicCtrl(skillGroup: FormGroup): FormControl {
    return skillGroup.get('characteristic') as FormControl;
  }

  private getGroup(name: string, level: number, characteristic: ECharacteristic | null): FormGroup {
    return this.fb.group({
      name: this.fb.control(name),
      level: this.fb.control(level),
      characteristic: this.fb.control(characteristic)
    });
  }

  private getFormGroupsFromSkills(skills: ISkill[]): FormGroup[] {
    return skills.map(skill => {
      return this.fb.group({
        name: this.fb.control(skill.name, Validators.required),
        level: this.fb.control(skill.level, [Validators.required, Validators.max(this.maxSkillLevel)]),
        characteristic: this.fb.control(skill.characteristic, Validators.required)
      });
    });
  }

  private getFormGroupsFromCharacteristics(characteristicList: ICharacteristic[]): FormGroup[] {
    return characteristicList.map(c => {
      return this.fb.group({
        name: this.fb.control(c.name, Validators.required),
        level: this.fb.control(c.level, Validators.max(this.maxSkillLevel)),
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
        this.setSkills(rows);
        this.setCharacteristics(rows);
        this.cdr.detectChanges();
      }
    }
    reader.readAsArrayBuffer(file);
  }

  private setSkills(rows: unknown[]): void {
    const newSkills: ISkill[] = rows.map(row => {
      const max = +(row as any)?.max;
      const min = +(row as any)?.min;
      return {
        characteristic: (row as any)?.characteristic,
        level: +(row as any)?.level || this.defaultSkillLevel,
        max: (max > this.maxSkillLevel ? this.maxSkillLevel : max) ?? this.maxSkillLevel,
        min: (min < this.minSkillLevel ? this.minSkillLevel : min) ?? this.minSkillLevel,
        name: '' + (row as any)?.name,
      }
    });
    this.skillsArray.clear();
    this.getFormGroupsFromSkills(newSkills).forEach(group => this.skillsArray.push(group));
  }

  private setCharacteristics(rows: unknown[]): void {
    const newCharacteristics: ICharacteristic[] = uniqBy(rows.map(row => {
      const max = +(row as any)?.max;
      const min = +(row as any)?.min;
      return {
        name: (row as any)?.characteristic,
        level: +(row as any)?.characteristicLevel || this.defaultCharacteristicLevel,
        max: (max > this.maxCharacteristicLevel ? this.maxCharacteristicLevel : max) ?? this.maxCharacteristicLevel,
        min: (min < this.minCharacteristicLevel ? this.minCharacteristicLevel : min) ?? this.minCharacteristicLevel,
      }
    }), 'name');
    this.characteristicsArray.clear();
    this.getFormGroupsFromCharacteristics(newCharacteristics).forEach(group => this.characteristicsArray.push(group));
  }

  onExportClicked(): void {
    const headings = [[
      'name',
      'level',
      'characteristic',
      'characteristicLevel'
    ]];

    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    const data = this.skillsArray.value.map((s: any, i: number) => {
      return {
        ...s,
        characteristicLevel: this.characteristicsArray.controls.find(g => g.get('name')?.value === s.characteristic)?.get('level')?.value
      };
    });
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `${this.fileName.value || 'skills'}.xlsx`);
    this.unsaved = false;
    this.form?.markAsPristine();
  }

  onDeleteClicked(index: number): void {
    this.skillsArray.removeAt(index)
  }

  onChangeLevelClicked(control: FormControl, change: number): void {
    if (!control) {
      return;
    }
    control.patchValue(control.value + change);
    if (control.pristine) {
      control.markAsDirty();
    }
  }

  onAddNewSkillClicked(): void {
    this.skillsArray.push(this.getGroup('', 0, null));
  }

  onRollDicesClicked(skillGroup: FormGroup): void {
    const skillLevelCtrl = this.getSkillLevelCtrl(skillGroup);
    const skillCharacteristic = this.getSkillCharacteristicCtrl(skillGroup).value;
    const characteristicLevel = this.characteristicsArray.controls.find(group => group.get('name')?.value === skillCharacteristic)?.get('level')?.value;
    const dices = this.getDices(skillLevelCtrl.value, characteristicLevel);
    if (!dices) {
      return;
    }
    const dialogRef = this.dialog.open(DiceRollComponent, {
      data: { dices },
      panelClass: 'modal'
    });
    if (!this.autoPex.value) {
      return;
    }
    const closed$ = new Subject<boolean>();
    dialogRef.backdropClick().pipe(take(1), takeUntil(closed$)).subscribe(() => dialogRef.componentInstance.closeDialog());
    dialogRef.afterClosed().pipe(first()).subscribe((rollCount: number) => {
      const newLevel = skillLevelCtrl.value + rollCount;
      if (skillLevelCtrl.value !== this.maxSkillLevel) {
        if (newLevel > this.maxSkillLevel) {
          skillLevelCtrl.setValue(this.maxSkillLevel);
        } else {
          skillLevelCtrl.setValue(newLevel);
        }
      }
      closed$.next(true);
      closed$.complete();
    });
  }

  private getDices(skillLevel: number, characteristicLevel: number): IDice[] {
    if (skillLevel === 0) {
      return new Array(characteristicLevel).fill(GreenDice);
    }
    const diceNumberBySkill = Math.floor(skillLevel / 20);
    const yellowDices = Math.min(diceNumberBySkill, characteristicLevel);
    const greenDices = Math.abs(diceNumberBySkill - characteristicLevel);
    return new Array(yellowDices).fill(YellowDice).concat(new Array(greenDices).fill(GreenDice));
  }

  onShowCharacteristicsClicked(): void {
    const dialogRef = this.dialog.open(CharacteristicBuilderComponent, {
      data: {
        max: this.maxCharacteristicLevel,
        min: this.minCharacteristicLevel,
        groups: this.characteristicsArray.controls,
      },
      panelClass: 'modal'
    });
    dialogRef.backdropClick().pipe(take(1)).subscribe(() => dialogRef.componentInstance.closeDialog());
  }
}
