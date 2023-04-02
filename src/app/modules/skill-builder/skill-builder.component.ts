import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.skillList = defaultSkills;
    const formGroups = this.getFormGroupsFromSkills(defaultSkills);

    this.formGroup = this.fb.group({
      skills: this.fb.array(formGroups)
    })
  }

  get skillsArray(): FormArray {
    return (this.formGroup?.get('skills') as FormArray);
  }

  get skillGroups(): FormGroup[] {
    return this.skillsArray?.controls as FormGroup[];
  }

  private getFormGroupsFromSkills(skills: Skill[]): FormGroup[] {
    return skills.map(skill => {
      return this.fb.group({
        name: this.fb.control(skill.name),
        level: this.fb.control(skill.level)
      });
    });
  }

  onImportCSVClicked(): void {

  }

  onExportCSVClicked(): void {
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
