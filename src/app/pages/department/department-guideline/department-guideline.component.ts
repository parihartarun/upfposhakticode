import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';

@Component({
  selector: 'app-department-guideline',
  templateUrl: './department-guideline.component.html',
  styleUrls: ['./department-guideline.component.css'],
})
export class DepartmentGuidelineComponent implements OnInit {
  checkfileFormat = false;
  guideLineList = this.departmentService.guideLineList.asObservable();
  fileToUpload: File = null;
  fileToHindiUpload: File = null;
  guidelineForm: FormGroup;
  id = null;
  isEdit = false;
  filterByType = '';
  orderBy: { order: string; key: string } = { order: '', key: '' };
  searchText = '';
  currentPage = 1;
  // isurl: boolean = false;
  // isfile: boolean = false;
  // ishindi: boolean = false;
  // isenglish: boolean = false;
  // isboth: boolean = false;
  // docError: boolean = false;
  // fileError: boolean = false;
  // urlError: boolean = false;
  englishFileUpload = false;
  hindiFileUpload = false;
  fileUploadError = false;
  docRadio = '';
  fileRadio = '';
  selectedLang = 'en';
  fileToEdit: string;
  filePathToEdit: string;

  fileToHiEdit: string;
  filePathToHiEdit: string;

  // related to form
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.initGuidelineForm();
    this.departmentService.getGuideline();
  }

  initGuidelineForm() {
    this.guidelineForm = this.formBuilder.group({
      doc_type: ['', [Validators.required]],
      file: [''],
      h_file: [''],
      description: [''],
      hindi_desc: [''],
      url: [''],
      guideline_type: ['', [Validators.required]],
      lang: ['', [Validators.required]],
    });
  } // initGuidelineForm()

  onChangeDocumentType() {
    let docTypeValue = this.docControl.value;
    this.urlControl.clearValidators();
    if (docTypeValue == 'url') {
      this.urlControl.setValidators(Validators.required);
    }

    this.urlControl.updateValueAndValidity();
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

  getGuidelineByType() {
    if (!!!this.filterByType) {
      this.departmentService.getGuideline();
    } else {
      this.departmentService.getGuidelineByType(this.filterByType);
    }
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    this.englishFileUpload = true;
    this.fileUploadError = false;
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.fileToUpload = null;
      this.guidelineForm.controls['file'].setValue('');
      return;
    } else {
      this.checkfileFormat = false;
    }
  }
  uploadHindi(files: FileList) {
    this.hindiFileUpload = true;
    this.fileUploadError = false;
    this.fileToHindiUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.fileToHindiUpload = null;
      this.guidelineForm.controls['h_file'].setValue('');
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

  // seletDocType() {
  //   this.docError = false;
  // }

  onLanguageChange(lang) {
    // this.selectedLang = lang;
    console.log(this.langControl.value);
    let languageValue = this.langControl.value;
    this.descEnControl.clearValidators();
    this.descHiControl.clearValidators();
    this.guidelineForm.get('file').setValue('');
    this.guidelineForm.get('h_file').setValue('');
    this.guidelineForm.get('file').clearValidators();
    this.guidelineForm.get('h_file').clearValidators();

    if (languageValue == 'en' || languageValue == 'both') {
      this.descEnControl.setValidators(Validators.required);
      if (this.docControl.value == 'file') {
        this.guidelineForm.get('file').setValidators(Validators.required);
      }
    }

    if (languageValue == 'hi' || languageValue == 'both') {
      this.descHiControl.setValidators(Validators.required);

      if (this.docControl.value == 'file') {
        this.guidelineForm.get('h_file').setValidators(Validators.required);
      }
    }

    this.descEnControl.updateValueAndValidity();
    this.descHiControl.updateValueAndValidity();
    this.guidelineForm.get('file').updateValueAndValidity();
    this.guidelineForm.get('h_file').updateValueAndValidity();
  }

  addGuideline() {
    this.submitted = true;

    // console.log(
    //   this.fileToUpload,
    //   this.fileToHindiUpload,
    //   this.guidelineForm.valid
    // );

    if (this.guidelineForm.valid) {
      const formData: FormData = new FormData();

      formData.append(
        'guideline_type',
        this.guidelineForm.value.guideline_type
      );
      formData.append('url', this.guidelineForm.value.url);
      formData.append('lang', this.guidelineForm.value.lang);
      formData.append('doc_type', this.guidelineForm.value.doc_type);

      if (this.langControl.value == 'hi' || this.langControl.value == 'both') {
        formData.append('hindi_desc', this.guidelineForm.value.hindi_desc);
        if (this.docControl.value == 'file') {
          formData.append('h_file', this.fileToHindiUpload);
        }
      }

      if (this.langControl.value == 'en' || this.langControl.value == 'both') {
        formData.append('description', this.guidelineForm.value.description);
        if (this.docControl.value == 'file') {
          formData.append('file', this.fileToUpload);
        }
      }

      this.departmentService.addGuideline(formData).subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success('Guideline Added Successfully.');
          this.departmentService.getGuideline();
          this.guidelineForm.reset();
          this.fileToUpload = null;
          this.fileToHindiUpload = null;
          this.submitted = false;
        } else {
          this.toastr.error('Something went wrong.');
        }
      });
    }
  }

  editGuideline(data) {
    // console.log(data);
    if (data.filePath != null) {
      var pathParts = data.filePath.split('/');
      this.fileToEdit = pathParts[pathParts.length - 1];
      this.filePathToEdit = data.filePath;
    }

    if (data.hinFilePath != null) {
      this.fileToHiEdit = data.hinFileName;
      this.filePathToHiEdit = data.hinFilePath;
    }

    this.guidelineForm.get('lang').patchValue(data.language);
    this.guidelineForm.get('doc_type').patchValue(data.doc_type);
    this.guidelineForm.get('guideline_type').patchValue(data.fpoGuidelineType);

    // this.guidelineForm.get('file').patchValue(data.file);
    // this.guidelineForm.get('h_file').patchValue(data.h_file);

    if (data.doc_type == 'url') {
      this.guidelineForm.get('url').patchValue(data.url);
    }

    if (data.language == 'en' || data.language == 'both') {
      this.descEnControl.patchValue(data.description);
      this.descEnControl.setValidators(Validators.required);
    }

    if (data.language == 'hi' || data.language == 'both') {
      this.descHiControl.patchValue(data.hindiDescription);
      this.descHiControl.setValidators(Validators.required);
    }

    this.descEnControl.updateValueAndValidity();
    this.descHiControl.updateValueAndValidity();

    this.id = data.id;
    this.isEdit = true;
  }
  deleteGuideline(id) {
    this.departmentService.deleteGuideline(id).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Guideline Deleted Successfully.');
        this.departmentService.getGuideline();
      } else {
        this.toastr.error('Error! While Deleting Guideline.');
      }
    });
  }

  updateGuideline() {
    const formData: FormData = new FormData();

    formData.append('lang', this.guidelineForm.value.lang);
    formData.append('doc_type', this.guidelineForm.value.doc_type);
    formData.append('file', this.fileToUpload);
    formData.append('h_file', this.fileToHindiUpload);
    formData.append('hindi_desc', this.guidelineForm.value.hindi_desc);
    formData.append('description', this.guidelineForm.value.description);
    formData.append('guideline_type', this.guidelineForm.value.guideline_type);
    formData.append('url', this.guidelineForm.value.url);
    formData.append('id', this.id);
    this.departmentService
      .updateGuideline(this.id, formData)
      .subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success('Guideline Updated Successfully.');
          this.departmentService.getGuideline();
          this.guidelineForm.reset();
          this.fileToUpload = null;
          this.fileToHindiUpload = null;
          this.isEdit = false;
          this.submitted = false;
        } else {
          this.toastr.error('Something went wrong.');
        }
      });
  }

  get descEnControl() {
    return this.guidelineForm.get('description');
  }

  get descHiControl() {
    return this.guidelineForm.get('hindi_desc');
  }

  get docControl() {
    return this.guidelineForm.get('doc_type');
  }

  get urlControl() {
    return this.guidelineForm.get('url');
  }

  get langControl() {
    return this.guidelineForm.get('lang');
  }

  get formControls() {
    return this.guidelineForm.controls;
  }

  resetForm() {
    this.guidelineForm.reset();
    this.fileToUpload = null;
    this.fileToHindiUpload = null;
    this.isEdit = false;
    this.submitted = false;
  }
}
