import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { read, utils, writeFile } from 'xlsx';
import { IDice } from '../../interfaces';

const defaultDices: IDice[] = [
];

@Component({
  selector: 'app-dice-builder',
  templateUrl: './dice-builder.component.html',
  styleUrls: ['./dice-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceBuilderComponent implements OnInit {
  diceList?: IDice[];
  formGroup?: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.diceList = defaultDices;
    const formGroups = this.getFormGroupsFromDices(defaultDices);

    this.formGroup = this.fb.group({
      dices: this.fb.array(formGroups),
      fileName: this.fb.control('')
    });
  }

  get dicesArray(): FormArray {
    return (this.formGroup?.get('dices') as FormArray);
  }

  get diceGroups(): FormGroup[] {
    return this.dicesArray?.controls as FormGroup[];
  }

  get fileName(): FormControl {
    return this.formGroup?.get('fileName') as FormControl;
  }

  private getFormGroupsFromDices(dices: IDice[]): FormGroup[] {
    return dices.map(dice => {
      return this.fb.group({
        level: this.fb.control(dice.name),
        faces: this.fb.array(dice.faces),
        color: this.fb.control(dice.color)
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
        const newDices: IDice[] = rows.map(row => {
          return {
            color: (row as any)?.color,
            faces: (row as any)?.faces,
            id: (row as any)?.id,
            name: (row as any)?.name + ''
          }
        });
        this.dicesArray.clear();
        this.getFormGroupsFromDices(newDices).forEach(group => this.dicesArray.push(group));
        this.cdr.detectChanges();
      }
    }
    reader.readAsArrayBuffer(file);
  }

  onExportClicked(): void {
    const headings = [[
      'name',
      'color',
      'faces'
    ]];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.dicesArray.value, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, `${this.fileName.value ?? 'dices'}.xlsx`);
  }

  onDeleteClicked(index: number): void {
    this.dicesArray.removeAt(index)
  }

  onChangeLevelClicked(control: AbstractControl, change: number): void {
    if (!control) {
      return;
    }
    control.setValue(control.value + change);
  }

  onAddNewDiceClicked(): void {
    this.dicesArray.push(this.fb.group({
      name: this.fb.control(''),
      color: this.fb.control(''),
      faces: this.fb.array([])
    }))
  }
}
