import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/_services/department/department.service';

@Component({
  selector: 'app-department-scheme',
  templateUrl: './department-scheme.component.html',
  styleUrls: ['./department-scheme.component.css']
})
export class DepartmentSchemeComponent implements OnInit {

  schemeList = this.departmentService.schemeList.asObservable();

  fileToUpload: File = null;
  schemeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public departmentService: DepartmentService) { }


  ngOnInit(): void {
    this.schemeForm = this.formBuilder.group({
      schemes_type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      departmentName: new FormControl(null, Validators.required),
      document: new FormControl(null, Validators.required),
    });
    this.departmentService.getScheme();
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  addSchemes() {
    this.schemeForm.markAllAsTouched();
    if (this.schemeForm.valid) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      this.departmentService.uploadSchemes({
        file: formData,
        description: this.schemeForm.value.description,
        schemes_type: this.schemeForm.value.schemes_type,
        parent_department : this.schemeForm.value.departmentName,
      })
    }
  }
  get typeValidation() { return this.schemeForm.get('schemes_type'); }
  get descValidation() { return this.schemeForm.get('description'); }
  get departValidation() { return this.schemeForm.get('departmentName'); }
  get docValidation() { return this.schemeForm.get('document'); }
}
