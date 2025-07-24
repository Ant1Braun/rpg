import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, first, take, takeUntil } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';
import { ICharacteristic, IDice, ISkill } from '../../interfaces';
import { DiceRollComponent } from '../dice-roll/dice-roll.component';
import { defaultSkills } from './constants';
import { ECharacteristic, EControlName } from 'src/app/enums';
import { GreenDice, YellowDice } from '../dice-roll/constants';
import { CharacteristicBuilderComponent } from '../characteristic-builder/characteristic-builder.component';
import { uniqBy } from 'lodash';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-skill-builder',
    templateUrl: './skill-builder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      TranslatePipe,
      MatExpansionModule,
      MatFormFieldModule,
      MatIcon,
      MatSelect,
      MatInputModule,
      FormsModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatButtonModule
    ]
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
  private destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const characteristicList = this.characteristics.map(characteristic => ({
      [EControlName.NAME]: characteristic,
      [EControlName.LEVEL]: this.defaultCharacteristicLevel,
      [EControlName.MAX]: this.maxCharacteristicLevel,
      [EControlName.MIN]: this.minCharacteristicLevel
    }));
    this.characteristicList = characteristicList;
    this.form = this.fb.group({
      [EControlName.SKILLS]: this.fb.array(this.getFormGroupsFromSkills(defaultSkills)),
      [EControlName.FILE_NAME]: this.fb.control(''),
      [EControlName.AUTO_PEX]: this.fb.control(true),
      [EControlName.CHARACTERISTICS]: this.fb.array(this.getFormGroupsFromCharacteristics(characteristicList))
    });
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.unsaved = true;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get fileNameCtrl(): FormControl {
    return this.form?.get(EControlName.FILE_NAME) as FormControl;
  }

  get autoPexCtrl(): FormControl {
    return this.form?.get(EControlName.AUTO_PEX) as FormControl;
  }

  get skillGroups(): FormGroup[] {
    return this.skillsArray?.controls as FormGroup[];
  }

  get skillsArray(): FormArray {
    return (this.form?.get(EControlName.SKILLS) as FormArray);
  }

  private get characteristicsArray(): FormArray {
    return (this.form?.get(EControlName.CHARACTERISTICS) as FormArray);
  }

  getSkillNameCtrl(skillGroup: FormGroup): FormControl {
    return skillGroup.get(EControlName.NAME) as FormControl;
  }

  getSkillLevelCtrl(skillGroup: FormGroup): FormControl {
    return skillGroup.get(EControlName.LEVEL) as FormControl;
  }

  getSkillCharacteristicCtrl(skillGroup: FormGroup): FormControl {
    return skillGroup.get(EControlName.CHARACTERISTIC) as FormControl;
  }

  // TO USE IF WE WANT TO ADD EXPERIENCE FEATURE
  // private get experience(): number {
  //   return this.skillsArray.value?.reduce((a: number, b: ISkill) => a + b.level - this.defaultSkillLevel, this.minSkillLevel);
  // }

  private getGroup(name: string, level: number, characteristic: ECharacteristic | null): FormGroup {
    return this.fb.group({
      [EControlName.NAME]: this.fb.control(name),
      [EControlName.LEVEL]: this.fb.control(level),
      [EControlName.CHARACTERISTIC]: this.fb.control(characteristic)
    });
  }

  private getFormGroupsFromSkills(skills: ISkill[]): FormGroup[] {
    return skills.map(skill => {
      return this.fb.group({
        [EControlName.NAME]: this.fb.control(skill.name, Validators.required),
        [EControlName.LEVEL]: this.fb.control(skill.level, [Validators.required, Validators.max(this.maxSkillLevel)]),
        [EControlName.CHARACTERISTIC]: this.fb.control(skill.characteristic, Validators.required)
      });
    });
  }

  private getFormGroupsFromCharacteristics(characteristicList: ICharacteristic[]): FormGroup[] {
    return characteristicList.map(c => {
      return this.fb.group({
        [EControlName.NAME]: this.fb.control(c.name, Validators.required),
        [EControlName.LEVEL]: this.fb.control(c.level, Validators.max(this.maxSkillLevel)),
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
    this.fileNameCtrl.setValue(fileName);
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
        [EControlName.CHARACTERISTIC]: (row as any)?.[EControlName.CHARACTERISTIC],
        [EControlName.LEVEL]: +(row as any)?.[EControlName.LEVEL] || this.defaultSkillLevel,
        [EControlName.MAX]: (max > this.maxSkillLevel ? this.maxSkillLevel : max) ?? this.maxSkillLevel,
        [EControlName.MIN]: (min < this.minSkillLevel ? this.minSkillLevel : min) ?? this.minSkillLevel,
        [EControlName.NAME]: '' + (row as any)?.[EControlName.NAME],
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
        [EControlName.NAME]: (row as any)?.[EControlName.CHARACTERISTIC],
        [EControlName.LEVEL]: +(row as any)?.[EControlName.CHARACTERISTIC_LEVEL] || this.defaultCharacteristicLevel,
        [EControlName.MAX]: (max > this.maxCharacteristicLevel ? this.maxCharacteristicLevel : max) ?? this.maxCharacteristicLevel,
        [EControlName.MIN]: (min < this.minCharacteristicLevel ? this.minCharacteristicLevel : min) ?? this.minCharacteristicLevel,
      }
    }), EControlName.NAME);
    this.characteristicsArray.clear();
    this.getFormGroupsFromCharacteristics(newCharacteristics).forEach(group => this.characteristicsArray.push(group));
  }

  onExportClicked(): void {
    const headings = [[
      EControlName.NAME,
      EControlName.LEVEL,
      EControlName.CHARACTERISTIC,
      EControlName.CHARACTERISTIC_LEVEL
    ]];

    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    const data = this.skillsArray.value.map((s: any, i: number) => {
      return {
        ...s,
        [EControlName.CHARACTERISTIC_LEVEL]: this.characteristicsArray.controls
          .find(g => g.get(EControlName.NAME)?.value === s[EControlName.CHARACTERISTIC])?.get(EControlName.LEVEL)?.value
      };
    });
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `${this.fileNameCtrl.value || EControlName.SKILLS}.xlsx`);
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
    const characteristicLevel = this.characteristicsArray.controls.find(group => group.get(EControlName.NAME)?.value === skillCharacteristic)?.get(EControlName.LEVEL)?.value;
    const dices = this.getDices(skillLevelCtrl.value, characteristicLevel);
    if (!dices) {
      return;
    }
    const dialogRef = this.dialog.open(DiceRollComponent, {
      data: { dices },
      panelClass: 'modal'
    });
    if (!this.autoPexCtrl.value) {
      return;
    }
    const closed$ = new Subject<void>();
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
      closed$.next();
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
