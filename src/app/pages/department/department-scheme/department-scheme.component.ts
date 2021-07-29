import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';

@Component({
  selector: 'app-department-scheme',
  templateUrl: './department-scheme.component.html',
  styleUrls: ['./department-scheme.component.css'],
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
  orderBy: { order: string; key: string } = { order: '', key: '' };
  searchText = '';
  docRadio = '';
  fileRadio = '';
  currentPage: number = 1;
  fileToEdit: string;
  filePathToEdit: string;

  fileToHiEdit: string;
  filePathToHiEdit: string;

  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public departmentService: DepartmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.schemeForm = this.formBuilder.group({
    //   file: [''],
    //   hi_file: [''],
    //   description: ['', [Validators.required]],
    //   hindi_desc: [''],
    //   url: [''],
    //   title : [''],
    //   parent_department : [''],
    // });
    this.initSchemeForm();

    this.departmentService.getScheme();
  }

  initSchemeForm() {
    this.schemeForm = this.formBuilder.group({
      doc_type: ['', [Validators.required]],
      file: [''],
      hi_file: [''],
      description: [''],
      hindi_desc: [''],
      url: [''],
      title: ['', [Validators.required]],
      parent_department: ['', [Validators.required]],
      lang: ['', [Validators.required]],
    });
  } // initGuidelineForm()

  onChangeDocumentType() {
    let docTypeValue = this.docControl.value;
    this.urlControl.clearValidators();
    this.langControl.setValue('');
    if (docTypeValue == 'url') {
      this.urlControl.setValidators(Validators.required);
    }

    this.urlControl.updateValueAndValidity();
  }

  onLanguageChange(lang) {
    // this.selectedLang = lang;
    console.log(this.langControl.value);
    let languageValue = this.langControl.value;

    this.schemeForm.get('file').setValue('');
    this.schemeForm.get('hi_file').setValue('');
    this.schemeForm.get('file').clearValidators();
    this.schemeForm.get('hi_file').clearValidators();
    this.descEnControl.clearValidators();
    this.descHiControl.clearValidators();

    if (languageValue == 'en' || languageValue == 'both') {
      this.descEnControl.setValidators(Validators.required);
      if (this.docControl.value == 'file') {
        this.schemeForm.get('file').setValidators(Validators.required);
      }
    }

    if (languageValue == 'hi' || languageValue == 'both') {
      this.descHiControl.setValidators(Validators.required);

      if (this.docControl.value == 'file') {
        this.schemeForm.get('hi_file').setValidators(Validators.required);
      }
    }

    this.descEnControl.updateValueAndValidity();
    this.descHiControl.updateValueAndValidity();
    this.schemeForm.get('file').updateValueAndValidity();
    this.schemeForm.get('hi_file').updateValueAndValidity();
  }

  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.fileToUpload = null;
      this.schemeForm.controls['file'].setValue('');
      return;
    } else {
      this.checkfileFormat = false;
    }
  }

  uploadHindi(files: FileList) {
    this.fileToHindiUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.fileToHindiUpload = null;
      this.schemeForm.controls['hi_file'].setValue('');
      return;
    } else {
      this.checkfileFormat = false;
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (
      ext.toLowerCase() == 'xlsx' ||
      ext.toLowerCase() == 'xls' ||
      ext.toLowerCase() == 'pdf' ||
      ext.toLowerCase() == 'doc' ||
      ext.toLowerCase() == 'docx'
    ) {
      return true;
    } else {
      return false;
    }
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      order: this.orderBy.order == 'asc' ? 'desc' : 'asc',
      key: key,
    };
  }
  onInputSearch() {
    this.currentPage = 1;
  }
  addSchemes() {
    this.submitted = true;
    // console.log(this.schemeForm);
    // this.schemeForm.markAllAsTouched();
    if (this.schemeForm.valid) {
      const formData: FormData = new FormData();
      // formData.append('file', this.fileToUpload);
      // formData.append('description', this.schemeForm.value.description);
      formData.append('title', this.schemeForm.value.title);
      formData.append(
        'parent_department',
        this.schemeForm.value.parent_department
      );
      formData.append('url', this.schemeForm.value.url);
      // formData.append('hindi_desc', this.schemeForm.value.hindi_desc);

      formData.append('lang', this.schemeForm.value.lang);
      formData.append('doc_type', this.schemeForm.value.doc_type);

      if (this.langControl.value == 'hi' || this.langControl.value == 'both') {
        formData.append('hindi_desc', this.schemeForm.value.hindi_desc);
        if (this.docControl.value == 'file') {
          formData.append('hi_file', this.fileToHindiUpload);
        }
      }

      if (this.langControl.value == 'en' || this.langControl.value == 'both') {
        formData.append('description', this.schemeForm.value.description);
        if (this.docControl.value == 'file') {
          formData.append('file', this.fileToUpload);
        }
      }

      this.departmentService.uploadSchemes(formData).subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success('Schemes Added Successfully.');
          this.departmentService.getScheme();
          this.fileToUpload = null;
          this.fileToHindiUpload = null;
          this.submitted = false;
          this.schemeForm.reset();
        } else {
          this.toastr.error('Something went wrong.');
        }
      });
      // this.schemeForm.reset();
    }
  }
  editSchemes(data) {
    console.log(data);
    if (data.filePath != null) {
      var pathParts = data.filePath.split('/');
      this.fileToEdit = pathParts[pathParts.length - 1];
      this.filePathToEdit = data.filePath;
    }

    if (data.hinFilepath != null) {
      this.fileToHiEdit = data.hinFileName;
      this.filePathToHiEdit = data.hinFilepath;
    }

    this.schemeForm.get('lang').patchValue(data.lang);
    this.schemeForm.get('doc_type').patchValue(data.docType);

    this.schemeForm.get('parent_department').patchValue(data.parentDepartment);
    this.schemeForm.get('description').patchValue(data.description);
    this.schemeForm.get('title').patchValue(data.schemeType);

    this.schemeForm.get('file').clearValidators();
    this.schemeForm.get('hi_file').clearValidators();
    this.descEnControl.clearValidators();
    this.descHiControl.clearValidators();

    if (data.docType == 'url') {
      this.schemeForm.get('url').patchValue(data.url);
    }

    if (data.lang == 'en' || data.lang == 'both') {
      this.descEnControl.patchValue(data.description);
      this.descEnControl.setValidators(Validators.required);
    }

    if (data.lang == 'hi' || data.lang == 'both') {
      this.descHiControl.patchValue(data.hindiDescription);
      this.descHiControl.setValidators(Validators.required);
    }

    this.descEnControl.updateValueAndValidity();
    this.descHiControl.updateValueAndValidity();
    this.schemeForm.get('file').updateValueAndValidity();
    this.schemeForm.get('hi_file').updateValueAndValidity();
    
    this.id = data.id;
    this.isEdit = true;
  }

  updateSchemes() {
    const formData: FormData = new FormData();
    formData.append('lang', this.schemeForm.value.lang);
    formData.append('doc_type', this.schemeForm.value.doc_type);
    formData.append('file', this.fileToUpload);
    formData.append('description', this.schemeForm.value.description);
    formData.append('title', this.schemeForm.value.title);
    formData.append(
      'parent_department',
      this.schemeForm.value.parent_department
    );
    formData.append('url', this.schemeForm.value.url);
    formData.append('hi_file', this.fileToHindiUpload);
    formData.append('hindi_desc', this.schemeForm.value.hindi_desc);

    formData.append('id', this.id);
    this.departmentService
      .editSchemes(this.id, formData)
      .subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success('Schemes Updated Successfully.');
          this.departmentService.getScheme();
          this.schemeForm.reset();
          this.isEdit = false;
          this.fileToUpload = null;
          this.fileToHindiUpload = null;
          this.submitted = false;
        } else {
          this.toastr.error('Error! While Updated Schemes.');
        }
      });
  }
  deleteSchemes(id) {
    this.departmentService.deleteSchemes(id);
  }
  // get typeValidation() { return this.schemeForm.get('schemes_type'); }
  // get descValidation() { return this.schemeForm.get('description'); }
  // get departValidation() { return this.schemeForm.get('departmentName'); }
  // get docValidation() { return this.schemeForm.get('document'); }
  // get urlValidation() { return this.schemeForm.get('url'); }

  get descEnControl() {
    return this.schemeForm.get('description');
  }

  get descHiControl() {
    return this.schemeForm.get('hindi_desc');
  }

  get docControl() {
    return this.schemeForm.get('doc_type');
  }

  get urlControl() {
    return this.schemeForm.get('url');
  }

  get langControl() {
    return this.schemeForm.get('lang');
  }

  get formControls() {
    return this.schemeForm.controls;
  }

  resetForm() {
    this.schemeForm.reset();
    this.fileToUpload = null;
    this.fileToHindiUpload = null;
    this.isEdit = false;
    this.submitted = false;
  }
}
