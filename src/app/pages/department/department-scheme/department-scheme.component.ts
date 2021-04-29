import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  checkfileFormat = false;
  fileToUpload: File = null;
  fileToHindiUpload: File = null;
  schemeForm: FormGroup;
  isEdit = false;
  id = null;
  orderBy: { order: string, key: string } = { order: '', key: '' };
  searchText = '';
  docRadio = '';
  fileRadio = '';
  currentPage:number = 1;
  fileToEdit:string;
  filePathToEdit:string;
  constructor(private formBuilder: FormBuilder, public departmentService: DepartmentService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.schemeForm = this.formBuilder.group({
      file: [''],
      h_file: [''],
      description: ['', [Validators.required]],
      hindi_desc: [''],
      url: [''],
      guideline_type: ['', [Validators.required]],
      title : [''],
      parent_department : [''],
    });

    this.departmentService.getScheme();
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.fileToUpload = null;
      this.schemeForm.controls['file'].setValue('');
      return;
    }
    else {

      this.checkfileFormat = false;
    }
  }

  uploadHindi(files: FileList) {
    this.fileToHindiUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.fileToHindiUpload = null;
      this.schemeForm.controls['hindi_desc'].setValue('');
      return;
    }
    else {

      this.checkfileFormat = false;
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xlsx' || ext.toLowerCase() == "xls" || ext.toLowerCase() == "pdf" || ext.toLowerCase() == "doc" || ext.toLowerCase() == "docx") {
      return true;
    }
    else {
      return false;
    }
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
      formData.append('title', this.schemeForm.value.title);
      formData.append('parent_department', this.schemeForm.value.parent_department);
      formData.append('url', this.schemeForm.value.url);
      formData.append('hindi_desc', this.schemeForm.value.hindi_desc);


      this.departmentService.uploadSchemes(formData);
      this.schemeForm.reset();
    }
  }
  editSchemes(data) {
    console.log(data);
    if(data.filePath != null){
      var pathParts = data.filePath.split("/");
      this.fileToEdit = pathParts[pathParts.length - 1];
      this.filePathToEdit = data.filePath;
    }
    this.schemeForm.get('parent_department').patchValue(data.parentDepartment);
    this.schemeForm.get('description').patchValue(data.description);
    this.schemeForm.get('title').patchValue(data.schemeType);
    this.schemeForm.get('url').patchValue(data.url);
    if (data.url) {
      this.schemeForm.get('url').patchValue(data.url);
      this.docRadio = 'url';
    } else {
      this.docRadio = 'file';
      if (data.description && data.hindiDescription) {
        this.schemeForm.get('hindi_desc').patchValue(data.hindiDescription);
        this.fileRadio = 'both';
        this.schemeForm.get('description').patchValue(data.description);
      } else if (data.description) {
        this.schemeForm.get('description').patchValue(data.description);
        this.fileRadio = 'english_upload';
      } else if (data.hindiDescription) {
        this.schemeForm.get('description').patchValue(data.description);
        this.fileRadio = 'hindi_upload';
      }
    }
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
        this.toastr.success('Schemes Updated Successfully.');
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
