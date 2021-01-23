import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-department-complaints',
  templateUrl: './department-complaints.component.html',
  styleUrls: ['./department-complaints.component.css']
})
export class DepartmentComplaintsComponent implements OnInit {
  complaintForm: FormGroup;
  submitted = false;
  complaintsCatageriy: Array<any> = [];
  complaints: Array<any> = [];

  p: number = 1;
  checkfileFormat: boolean = false;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.api.getComplaints_Suggestions().subscribe(cs => {
      this.complaintsCatageriy = cs
    })
    this.complaintForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      filePath: [''],
      uploadFile: ['']
    });
    this.getComplaints();
  }

  getComplaints() {
    this.complaints = [
      {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        category: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      },
    ]
    this.api.getComplaints().subscribe(response => {
      console.log(response);
      this.complaints = response;
    },
      err => {
        console.log(err)
      }
    );

  }

  addComplaint() {
    this.submitted = true;
    if (this.complaintForm.invalid) {
      return;
    }
    this.api.addComplaint(this.complaintForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls() {
    return this.complaintForm.controls;
  }
  upload(files: File[]) {
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      return;
    }
    else {
      this.uploadAndProgress(files);
      this.checkfileFormat = false;
    }
  }
  uploadAndProgress(files: File[]) {
    console.log(files)
    var formData = new FormData();
    formData.append('file', this.complaintForm.controls['uploadFile'].value);

    this.api.uopladFile(formData).subscribe(event => {

    });

  }
  selectComplaint(complaint) {
    this.complaintForm.controls['title'].setValue(complaint.currentTarget.value);
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpgj" || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "pdf") {
      return true;
    }
    else {
      return false;
    }
  }
}
