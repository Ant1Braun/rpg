import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { read, utils, writeFile } from 'xlsx';
import { IDicesByLebel, ISkill } from '../../interfaces';
import { DiceRollComponent, GreenDice, YellowDice } from '../dice-roll/dice-roll.component';

const defaultSkills: ISkill[] = [
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
const defaultDicesByLevel: IDicesByLebel[] = [{
  min: 0,
  max: 9,
  dices: [GreenDice]
}, {
  min: 10,
  max: 19,
  dices: [YellowDice]
}, {
  min: 20,
  max: 29,
  dices: [GreenDice, GreenDice]
}, {
  min: 30,
  max: 39,
  dices: [GreenDice, YellowDice]
}, {
  min: 40,
  max: 49,
  dices: [YellowDice, YellowDice]
}, {
  min: 50,
  max: 59,
  dices: [GreenDice, GreenDice, GreenDice]
}, {
  min: 60,
  max: 69,
  dices: [GreenDice, GreenDice, YellowDice]
}, {
  min: 70,
  max: 79,
  dices: [GreenDice, YellowDice, YellowDice]
}, {
  min: 80,
  max: 89,
  dices: [GreenDice, GreenDice, GreenDice, GreenDice]
}, {
  min: 90,
  max: 99,
  dices: [YellowDice, YellowDice, YellowDice]
}, {
  min: 100,
  max: 109,
  dices: [GreenDice, GreenDice, GreenDice, YellowDice]
}, {
  min: 110,
  max: 119,
  dices: [GreenDice, GreenDice, YellowDice, YellowDice]
}, {
  min: 120,
  max: 129,
  dices: [GreenDice, YellowDice, YellowDice, YellowDice]
}, {
  min: 130,
  max: 139,
  dices: [GreenDice, GreenDice, GreenDice, GreenDice, GreenDice]
}, {
  min: 140,
  max: 149,
  dices: [GreenDice, YellowDice, YellowDice, YellowDice]
}, {
  min: 150,
  max: 159,
  dices: [GreenDice, GreenDice, GreenDice, GreenDice, YellowDice]
}, {
  min: 160,
  max: 169,
  dices: [YellowDice, YellowDice, YellowDice, YellowDice]
}, {
  min: 170,
  max: 179,
  dices: [GreenDice, GreenDice, GreenDice, YellowDice, YellowDice]
}, {
  min: 180,
  max: 189,
  dices: [GreenDice, GreenDice, YellowDice, YellowDice, YellowDice]
}, {
  min: 190,
  max: 199,
  dices: [GreenDice, YellowDice, YellowDice, YellowDice, YellowDice]
}, {
  min: 200,
  max: 200,
  dices: [YellowDice, YellowDice, YellowDice, YellowDice, YellowDice]
}];

@Component({
  selector: 'app-skill-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillBuilderComponent implements OnInit {
  skillList?: ISkill[];
  form?: FormGroup;
  @HostListener('window:beforeunload', ['event'])
  do(event: any) {
    if (this.form?.dirty) {
      event.returnValue = '';
    }
  }

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
      fileName: this.fb.control('')
    });
  }

  get skillsArray(): FormArray {
    return (this.form?.get('skills') as FormArray);
  }

  get experience(): number {
    return this.skillsArray.value?.reduce((a: number, b: ISkill) => a + b.level - 20, 0);
  }

  get skillGroups(): FormGroup[] {
    return this.skillsArray?.controls as FormGroup[];
  }

  get fileName(): FormControl {
    return this.form?.get('fileName') as FormControl;
  }

  private getFormGroupsFromSkills(skills: ISkill[]): FormGroup[] {
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
        const newSkills: ISkill[] = rows.map(row => {
          return {
            id: (row as any)?.id + '',
            level: +(row as any)?.level,
            max: +(row as any)?.max ?? 100,
            min: +(row as any)?.min ?? 0,
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
    if (control.pristine) {
      control.markAsDirty();
    }
  }

  onAddNewSkillClicked(): void {
    this.skillsArray.push(this.fb.group({
      name: this.fb.control(''),
      level: this.fb.control(20)
    }))
  }

  onRollDicesClicked(skillLevel: number): void {
    const dices = defaultDicesByLevel.find(d => skillLevel <= d.max && skillLevel >= d.min)?.dices;
    if (!dices) {
      return;
    }
    this.dialog.open(DiceRollComponent, {
      data: { dices }
    });
  }
}
