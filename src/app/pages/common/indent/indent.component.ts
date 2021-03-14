import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { ProductService } from 'src/app/_services/product/product.service';

@Component({
  selector: 'app-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.css']
})
export class IndentComponent implements OnInit {
  indents: any = [];
  loading:boolean=false;
  p: number = 1;
  userid:number;
  userrole:string;
  userRole: string;
  masterId: string;
  indentForm: FormGroup;
  currentItem: any;
  constructor(private fb: FormBuilder,private _productService: ProductService,private modalService: NgbModal,private auth:AuthService,private fpoService:FpoService) { }

  ngOnInit(): void {
    this.getIdent()
   
  }
  opendialog($event,content,item)
  {
   this.currentItem = item;
    
    this.indentForm = this.fb.group({
      status: [undefined,Validators.required],
      soldQuantity:[undefined,[Validators.required,Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]],
      reason: [""],     
    })

    this.modalService.open(content);
}

  getIdent() {
    
    this.loading = true;
    this.indents = [ ],
    // localStorage.setItem('userRole', response.userRole);
    //localStorage.setItem('masterId', response.masterId);
    this.userRole = localStorage.getItem('userRole');
    this.masterId = localStorage.getItem('masterId');
    console.log("User role on Indent List Page  = "+this.userRole);
    console.log("Master Id on Indent List Page  = "+this.masterId);
    
        if (this.userRole == 'ROLE_FPC') {  
      this.fpoService.getIndentByFpoId(this.masterId).subscribe(data=>{
        console.log("Data Has been received"+JSON.stringify(data));
        this.indents = data;
        this.loading = false;
      })

    }  else {
      this.fpoService.getIndentByUserId(this.masterId).subscribe(data=>{
        console.log("Data Has been received"+JSON.stringify(data));
        this.indents = data;
        this.loading = false;
      })

    }


  }

  
  save()
  {
    console.log("data serializes - "+JSON.stringify(this.indentForm.value));

this._productService.updateEnquiry(this.indentForm.value,this.currentItem.id).subscribe(data=>{
  console.log("Updated Successfully");

  this.modalService.dismissAll();
  this.getIdent();
 // this.ngOnInit();
})
  }
}
