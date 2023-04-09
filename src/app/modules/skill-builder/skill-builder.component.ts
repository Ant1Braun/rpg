import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { read, utils, writeFile } from 'xlsx';
import { Skill } from '../../interfaces';

const defaultSkills: Skill[] = [
  {
    id: '0',
    level: 20,
    max: 90,
    min: 20,
    name: 'athletics'
  },
  {
    id: '1',
    max: 90,
    min: 20,
    level: 20,
    name: 'knowledge'
  },
  {
    id: '2',
    max: 90,
    min: 20,
    level: 20,
    name: 'perception'
  },
  {
    id: '3',
    max: 90,
    min: 20,
    level: 20,
    name: 'medicine'
  },
  {
    id: '4',
    max: 90,
    min: 20,
    level: 20,
    name: 'stealth'
  },
  {
    id: '5',
    max: 90,
    min: 20,
    level: 20,
    name: 'survival'
  },
  {
    id: '100',
    max: 90,
    min: 20,
    level: 20,
    name: 'brawl'
  },
  {
    id: '101',
    max: 90,
    min: 20,
    level: 20,
    name: 'gunnery'
  },
  {
    id: '102',
    max: 90,
    min: 20,
    level: 20,
    name: 'melee'
  },
  {
    id: '103',
    max: 90,
    min: 20,
    level: 20,
    name: 'light ranged'
  },
  {
    id: '104',
    max: 90,
    min: 20,
    level: 20,
    name: 'heavy ranged'
  }
];

@Component({
  selector: 'app-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillBuilderComponent implements OnInit {
  skillList?: Skill[];
  formGroup?: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.skillList = defaultSkills;
    const formGroups = this.getFormGroupsFromSkills(defaultSkills);

    this.formGroup = this.fb.group({
      skills: this.fb.array(formGroups),
      fileName: this.fb.control('')
    });
  }

  get skillsArray(): FormArray {
    return (this.formGroup?.get('skills') as FormArray);
  }

  get experience(): number {
    return this.skillsArray.value?.reduce((a: number, b: Skill) => a + b.level - 20, 0);
  }

  get skillGroups(): FormGroup[] {
    return this.skillsArray?.controls as FormGroup[];
  }

  get fileName(): FormControl {
    return this.formGroup?.get('fileName') as FormControl;
  }

  private getFormGroupsFromSkills(skills: Skill[]): FormGroup[] {
    return skills.map(skill => {
      return this.fb.group({
        name: this.fb.control(skill.name),
        level: this.fb.control(skill.level)
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
        const newSkills: Skill[] = rows.map(row => {
          return {
            id: (row as any)?.id + '',
            level: +(row as any)?.level,
            max: +(row as any)?.max ?? 90,
            min: +(row as any)?.min ?? 20,
            name: (row as any)?.name + ''
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
    writeFile(wb, `${this.fileName.value ?? 'skills'}.xlsx`);
  }

  onDeleteClicked(index: number): void {
    this.skillsArray.removeAt(index)
  }

  onChangeLevelClicked(control: AbstractControl, change: number): void {
    if (!control) {
      return;
    }
    control.setValue(control.value + change);
  }

  onAddNewSkillClicked(): void {
    this.skillsArray.push(this.fb.group({
      name: this.fb.control(''),
      level: this.fb.control(20)
    }))
  }
}
