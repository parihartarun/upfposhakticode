import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/_services/department/department.service';

@Component({
  selector: 'app-department-guideline',
  templateUrl: './department-guideline.component.html',
  styleUrls: ['./department-guideline.component.css']
})
export class DepartmentGuidelineComponent implements OnInit {

  guideLineList = this.departmentService.guideLineList.asObservable();
  fileToUpload: File = null;

  constructor(private formBuilder: FormBuilder, public departmentService: DepartmentService) { }
  guidelineForm: FormGroup;

  ngOnInit(): void {
    this.guidelineForm = this.formBuilder.group({
      guideline_type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      document: new FormControl(null, Validators.required),
    });
    this.departmentService.getGuideline();
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(' this.fileToUpload', this.fileToUpload);
  }
  addGuideline() {
    this.guidelineForm.markAllAsTouched();
    if (this.guidelineForm.valid) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      this.departmentService.uploadGuideline({
        file: formData,
        description: this.guidelineForm.value.description,
        guideline_type: this.guidelineForm.value.guideline_type
      })
    }
  }
  editGuideline(data) {
    this.guidelineForm.get('guideline_type').patchValue(data.fpoGuidelineType)
    this.guidelineForm.get('description').patchValue(data.description)
    this.guidelineForm.get('document').patchValue(data.fileName)
  }
  get typeValidation() { return this.guidelineForm.get('guideline_type'); }
  get descValidation() { return this.guidelineForm.get('description'); }
  get docValidation() { return this.guidelineForm.get('document'); }
}
