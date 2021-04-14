import { Component, OnInit } from '@angular/core';
import { FpoService } from '../../../_services/fpo/fpo.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product/product.service';
import { LEFT_ARROW } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-indent-for-fulfillment',
  templateUrl: './indent-for-fulfillment.component.html',
  styleUrls: ['./indent-for-fulfillment.component.css']
})
export class IndentForFulfillmentComponent implements OnInit {
  showTable: any = {}
  loading: boolean = false;
  data: any;
  data2: any;
  userRole: any;
  indents: any;
  indents2: any;
  indents3: any;
  indents4: any;
  indents5: any;
  totCrops: number = 0;
  selected: any;
  fertTot: any = 0;
  seedTot: any = 0;
  insTot: any = 0;
  machTot: any = 0;
  closeResult: string;
  indentForm: FormGroup;
  currentItem: any;
  p:number;
  isQuantity = true;

  filterParams = {
    masterId: '',
    roleId: ''
  }



  constructor(private _productService: ProductService, private fb: FormBuilder, private modalService: NgbModal,public fpoService: FpoService, private toastr: ToastrService, private supplierService: InputSupplierService) {
    if (this.userRole == 'ROLE_FPC') {
      this.showTable.val = 'A';
    } else if (this.userRole == 'ROLE_CHCFMB') {
      this.showTable.val = 'D';
    } else {
      this.showTable.val = 'B';
    }

  }

  ngOnInit() {
    this.loading = true;
    this.filterParams.masterId = localStorage.getItem('masterId');
    this.filterParams.roleId = localStorage.getItem('roleRefId');
    console.log(localStorage.getItem('roleRefId'));
    this.userRole = localStorage.getItem('userRole');
    console.log("FilterParams", this.filterParams);
    if (this.userRole == 'ROLE_FPC') {
      this.fpoService.getIndentByFpoId(this.filterParams.masterId).subscribe(dummy => {
        console.log(dummy);
        this.data = dummy;
        this.indents = this.data;
        this.totCrops = this.data.length;
        this.loading = false;
      });
    }
    this.fpoService.getFulfillIndent(this.filterParams).subscribe(dummy => {
      this.data2 = dummy;
      // this.indents = this.data;
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents2 = this.data2.seedIndent;
        this.indents3 = this.data2.fertilizerIndent;
        this.indents4 = this.data2.insecticideIndent;
      }
      this.indents5 = this.data2.machineryIndent;
      this.selected = "";
      // // Total values
      // this.totCrops =this.data.length;
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.fertTot = this.data2.fertilizerIndent.length;
        this.seedTot = this.data2.seedIndent.length;
        this.insTot = this.data2.insecticideIndent.length;
      }
      this.machTot = this.data2.machineryIndent.length;
      this.loading = false;
    });
  }

  showHiddenTable(elem) {
    console.log("Triggered");
    this.showTable.val = elem;
  }

  onSelect(val) {
    if (val === "") {
      if (this.userRole == 'ROLE_FPC') {
        this.indents = this.data;
      }
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents3 = this.data2.fertilizerIndent;
        this.indents2 = this.data2.seedIndent;
        this.indents4 = this.data2.insecticideIndent;
      }
      this.indents5 = this.data2.machineryIndent;
    } else {
      if (this.userRole == 'ROLE_FPC') {
        this.indents = this.data.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      }
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents3 = this.data2.fertilizerIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
        this.indents2 = this.data2.seedIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
        this.indents4 = this.data2.insecticideIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      }
      this.indents5 = this.data2.machineryIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
    }
  }

  opendialog($event,content,item)
  {    console.log(item);
    this.currentItem = item;

    this.indentForm = this.fb.group({
      status: [undefined,Validators.required],
      soldQuantity:[item.quantity,[Validators.required,Validators.pattern('^\\s*(?=.*[0-9])\\d*(?:\\.\\d{1,2})?\\s*$')]],
      reason: [""],     
    })

    this.modalService.open(content);
}

save()
{
  console.log("data serializes - "+JSON.stringify(this.indentForm.value));
  if(this.indentForm.value.status == 'rejected'){
    this.indentForm.patchValue({
      soldQuantity:0
    })
  }
  if(this.indentForm.invalid){
    return;
  }
this._productService.updateEnquiry(this.indentForm.value,this.currentItem.id).subscribe(data=>{
console.log("Updated Successfully");

this.modalService.dismissAll();
this.fpoService.getIndentByFpoId(this.filterParams.masterId).subscribe(dummy => {
  console.log(dummy);
  this.data = dummy;
  this.indents = this.data;
  this.totCrops = this.data.length;
});
})
}
  selectIndentSeeds(id, status) {
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.updateSeedIndent(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>', response);
      this.toastr.success('Indent Successfully Updated');
      //   this.getIndentDetailsForSupplier();
    },
      err => {
        console.log(err)
      }
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  selectIndentInsecticide(id, status) {
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.updateInsecticideIndent(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>', response);
      this.toastr.success('Indent Successfully Updated');
      //  this.getIndentDetailsForSupplier();
    },
      err => {
        console.log(err)
      }
    );
  }

  selectIndentFertiliser(id, status) {
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>datadata', data);
    this.supplierService.updateFertilizerIndent(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>', response);
      this.toastr.success('Indent Successfully Updated');
      this.getIndentDetailsForSupplier();
    },
      err => {
        console.log(err)
      }
    );
  }

  selectIndentMachinery(id, status) {
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.updateMachinaryIndent(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>', response);
      this.toastr.success('Indent Successfully Updated');
      //  this.getIndentDetailsForSupplier();

    },
      err => {
        console.log(err)
      }
    );
  }

  getIndentDetailsForSupplier() {
    if (this.filterParams.roleId == 'ROLE_FPC') {
      this.fpoService.getIndentByFpoId(this.filterParams.masterId).subscribe(dummy => {
        this.data = dummy;
        this.indents = this.data;
        this.totCrops = this.data.length;
        this.loading = false;
      });
    }

    this.fpoService.getFulfillIndent(this.filterParams).subscribe(dummy => {
      this.data2 = dummy;
      // this.indents = this.data;
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents2 = this.data2.seedIndent;
        this.indents3 = this.data2.fertilizerIndent;
        this.indents4 = this.data2.insecticideIndent;
      }
      this.indents5 = this.data2.machineryIndent;
      this.selected = "";
      // // Total values
      // this.totCrops =this.data.length;
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.fertTot = this.data2.fertilizerIndent.length;
        this.seedTot = this.data2.seedIndent.length;
        this.insTot = this.data2.insecticideIndent.length;
      }
      this.machTot = this.data2.machineryIndent.length;
      this.loading = false;
    },
      err => {
        console.log(err)
      }
    );
  }

  changeIndentStatus(status){
    if(status == 'partially fulfilled'){
      this.isQuantity = true;
    }else if(status == 'rejected' || status == 'fulfilled'){
      this.isQuantity = false;
    }
  }

}
