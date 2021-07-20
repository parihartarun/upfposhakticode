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
  allIndentsData: any;
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
  p: number;
  isQuantity = true;
  indentStatus = '';
  indentFormType = '';
  filterParams = {
    masterId: '',
    roleId: ''
  }

  constructor(private _productService: ProductService, private fb: FormBuilder, private modalService: NgbModal, public fpoService: FpoService, private toastr: ToastrService, private supplierService: InputSupplierService) {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole == 'ROLE_FPC') {
      this.showTable.val = 'A';
    } else if (this.userRole == 'ROLE_CHCFMB') {
      this.showTable.val = 'E';
    } else {
      this.showTable.val = 'B';
    }
  }

  ngOnInit() {
    this.loading = true;
    this.filterParams.masterId = localStorage.getItem('masterId');
    this.filterParams.roleId = localStorage.getItem('roleRefId');
    this.userRole = localStorage.getItem('userRole');
    this.getIndentsForFulfillment();
    if (this.userRole == 'ROLE_FPC') {
      this.getIndentsForCrops();
    }
  }

  getIndentsForFulfillment(){
    this.fpoService.getFulfillIndent(this.filterParams).subscribe(res => {
      console.log(res);
      this.allIndentsData = res;
      this.indents5 = res.machineryIndent;
      this.machTot = res.machineryIndent.length;
      this.selected = "";
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents2 = res.seedIndent;
        this.indents3 = res.fertilizerIndent;
        this.indents4 = res.insecticideIndent;
        this.fertTot = res.fertilizerIndent.length;
        this.seedTot = res.seedIndent.length;
        this.insTot = res.insecticideIndent.length;
      }
      this.loading = false;
    });
  }

  getIndentsForCrops(){
    this.fpoService.getIndentByFpoId(this.filterParams.masterId).subscribe(dummy => {
      console.log(dummy);
      this.data = dummy;
      this.indents = this.data;
      this.totCrops = this.data.length;
      this.loading = false;
    });
  }

  showHiddenTable(elem) {
    this.showTable.val = elem;
  }

  onSelect(val) {
    if (val === "") {
      this.indents5 = this.allIndentsData.machineryIndent;
      if (this.userRole == 'ROLE_FPC') {
        this.indents = this.data;
      }
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents3 = this.allIndentsData.fertilizerIndent;
        this.indents2 = this.allIndentsData.seedIndent;
        this.indents4 = this.allIndentsData.insecticideIndent;
      }
    } else {
      this.indents5 = this.allIndentsData.machineryIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      if (this.userRole == 'ROLE_FPC') {
        this.indents = this.data.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      }
      if (this.userRole !== 'ROLE_CHCFMB') {
        this.indents3 = this.allIndentsData.fertilizerIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
        this.indents2 = this.allIndentsData.seedIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
        this.indents4 = this.allIndentsData.insecticideIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      }
    }
  }

  opendialog($event, content, item, type) {
    console.log(item);
    this.currentItem = item;
    this.indentFormType = type;
    this.indentForm = this.fb.group({
      status: [undefined, Validators.required],
      soldQuantity: [item.quantity, [Validators.required, Validators.pattern('^\\s*(?=.*[0-9])\\d*(?:\\.\\d{1,2})?\\s*$')]],
      reason: [""],
    })
    this.modalService.open(content);
  }

  updateCropIndent() {   
    if (this.indentForm.value.status == 'rejected') {
      this.indentForm.patchValue({
        soldQuantity: 0
      })
    }
    if (this.indentForm.invalid) {
      return;
    }
    console.log(this.currentItem);
    this._productService.updateEnquiry(this.indentForm.value, this.currentItem.enid).subscribe(data => {
      this.modalService.dismissAll();
      this.fpoService.getIndentByFpoId(this.filterParams.masterId).subscribe(dummy => {
        this.toastr.success('Indent Successfully Updated');
        this.data = dummy;
        this.indents = this.data;
        this.totCrops = this.data.length;
      });
    })
  }

  updateFertilizerIndent(id) {
    let data = {
      "enqId": id,
      "status": this.indentStatus
    };
    this.supplierService.updateFertilizerIndent(data).subscribe(response => {
      this.toastr.success('Indent Successfully Updated');
      this.modalService.dismissAll();
      this.getIndentsForFulfillment();
    },
      err => {
        console.log(err)
      }
    );
  }


  updateSeedIndent(id) {
    let data = {
      "enqId": id,
      "status": this.indentStatus
    };
    this.supplierService.updateSeedIndent(data).subscribe(response => {
      this.toastr.success('Indent Successfully Updated');
      this.modalService.dismissAll();
      this.getIndentsForFulfillment();
    },
      err => {
        console.log(err)
      }
    );
  }

  updateInsecticideIndent(id) {
    let data = {
      "enqId": id,
      "status": this.indentStatus
    };
    this.supplierService.updateInsecticideIndent(data).subscribe(response => {
      this.toastr.success('Indent Successfully Updated');
      this.modalService.dismissAll();
      this.getIndentsForFulfillment();
    },
      err => {
        console.log(err)
      }
    );
  }

  updateMachinaryIndent(id) {
    let data = {
      "enqId": id,
      "status": this.indentStatus
    };
    this.supplierService.updateMachinaryIndent(data).subscribe(response => {
      this.toastr.success('Indent Successfully Updated');
      this.modalService.dismissAll();
      this.getIndentsForFulfillment();
    },
      err => {
        console.log(err)
      }
    );
  }

  changeIndentStatus(status) {
    console.log(status);
    this.indentStatus = status;
    if (status == 'partially fulfilled') {
      this.isQuantity = true;
    } else if (status == 'rejected' || status == 'fulfilled') {
      this.isQuantity = false;
    }
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

}
