import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  isEdit = false;
  id = null;
  orderBy: { order: string, key: string } = { order: '', key: '' };
  currentPage = 1;
  searchText = '';
  constructor(private formBuilder: FormBuilder, public departmentService: DepartmentService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.schemeForm = this.formBuilder.group({
      schemes_type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      departmentName: new FormControl(null, Validators.required),
      document: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required)
    });
    this.departmentService.getScheme();
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };

  }
  onInputSearch() {
    this.currentPage = 1;
  }
  addSchemes() {

    this.schemeForm.markAllAsTouched();
    if (this.schemeForm.valid) {

      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('description', this.schemeForm.value.description);
      formData.append('title', this.schemeForm.value.schemes_type);
      formData.append('parent_department', this.schemeForm.value.departmentName);
      formData.append('url', this.schemeForm.value.url);

      this.departmentService.uploadSchemes(formData);
      this.schemeForm.reset();
    }
  }
  editSchemes(data) {
    this.schemeForm.get('departmentName').patchValue(data.parentDepartment);
    this.schemeForm.get('description').patchValue(data.description);
    this.schemeForm.get('schemes_type').patchValue(data.schemeType);
    this.schemeForm.get('url').patchValue(data.url);

    // this.schemeForm.get('document').patchValue(data.fileName);
    this.id = data.id;
    this.isEdit = true;
  }
  updateSchemes() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description', this.schemeForm.value.description);
    formData.append('title', this.schemeForm.value.schemes_type);
    formData.append('parent_department', this.schemeForm.value.departmentName);
    formData.append('url', this.schemeForm.value.url);

    formData.append('id', this.id);
    this.departmentService.editSchemes(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Schemes Updated successfully.');
        this.departmentService.getScheme();
        this.schemeForm.reset();
        this.isEdit = false;
      } else {
        this.toastr.error('Error! While Updated Schemes.');
      }
    })
  }
  deleteSchemes(id) {
    this.departmentService.deleteSchemes(id);
  }
  get typeValidation() { return this.schemeForm.get('schemes_type'); }
  get descValidation() { return this.schemeForm.get('description'); }
  get departValidation() { return this.schemeForm.get('departmentName'); }
  get docValidation() { return this.schemeForm.get('document'); }
  get urlValidation() { return this.schemeForm.get('url'); }

}
