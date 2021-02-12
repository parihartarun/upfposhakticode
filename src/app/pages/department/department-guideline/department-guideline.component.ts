import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';

@Component({
  selector: 'app-department-guideline',
  templateUrl: './department-guideline.component.html',
  styleUrls: ['./department-guideline.component.css']
})
export class DepartmentGuidelineComponent implements OnInit {

  guideLineList = this.departmentService.guideLineList.asObservable();
  fileToUpload: File = null;
  guidelineForm: FormGroup;
  id = null;
  isEdit = false;
  filterByType = '';
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, public departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.guidelineForm = this.formBuilder.group({
      guideline_type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      document: new FormControl(null, Validators.required),
    });
    this.departmentService.getGuideline();
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
  }
  addGuideline() {
    this.guidelineForm.markAllAsTouched();
    if (this.guidelineForm.valid) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('description', this.guidelineForm.value.description);
      formData.append('guideline_type', this.guidelineForm.value.guideline_type);
      this.departmentService.addGuideline(formData);
      this.guidelineForm.reset();
    }
  }
  editGuideline(data) {
    this.guidelineForm.get('guideline_type').patchValue(data.fpoGuidelineType);
    this.guidelineForm.get('description').patchValue(data.description);
    // this.guidelineForm.get('document').patchValue(data.fileName);
    this.id = data.id;
    this.isEdit = true;
  }
  deleteGuideline(id) {
    this.departmentService.deleteGuideline(id).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Guideline Deleted successfully.');
        this.departmentService.getGuideline();
      } else {
        this.toastr.error('Error! While Deleting Guideline.');
      }
    })
  }
  updateGuideline() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description', this.guidelineForm.value.description);
    formData.append('guideline_type', this.guidelineForm.value.guideline_type);
    formData.append('id', this.id);
    this.departmentService.updateGuideline(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Guideline updated successfully.');
        this.departmentService.getGuideline();
        this.guidelineForm.reset();
      } else {
        this.toastr.error('Something went wrong.');
      }
    })
  }
  get typeValidation() { return this.guidelineForm.get('guideline_type'); }
  get descValidation() { return this.guidelineForm.get('description'); }
  get docValidation() { return this.guidelineForm.get('document'); }
}
