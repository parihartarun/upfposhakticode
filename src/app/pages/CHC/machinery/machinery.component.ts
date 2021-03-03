import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChcFmbService } from 'src/app/_services/chc_fmb/chc-fmb.service';

@Component({
  selector: 'app-machinery',
  templateUrl: './machinery.component.html',
  styleUrls: ['./machinery.component.css']
})
export class MachineryComponent implements OnInit {
  formRadio = true
  formData: any = {};
  masterId = '';
  checkfileFormat: boolean = false;
  fileToUpload: File = null;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  currentPage = 1;
  searchText = '';
  isEdit = false;
  orderBy: { order: string, key: string } = { order: '', key: '' };

  equipmentTypes = this.chcFmbService.equipmentTypes.asObservable();
  equipmentName = this.chcFmbService.equipmentName.asObservable();
  machineryList = this.chcFmbService.machineryList.asObservable();
  constructor(public chcFmbService: ChcFmbService, private toastr: ToastrService, private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.masterId = localStorage.getItem('masterId');
    this.getAllMachineryList();
    this.chcFmbService.getequipmenttypes();
  }
  getAllMachineryList() {
    this.chcFmbService.getAllMachinery(this.masterId);
  }
  public fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  getEquipment() {
    this.chcFmbService.getequipmentname(this.formData.type_id)
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      return;
    }
    else {

      this.checkfileFormat = false;
    }
  }
  addMachinery(machineryForm) {

    machineryForm.control.markAllAsTouched()
    if (machineryForm.valid) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('capacity', this.formData.capacity);
      formData.append('chc_fmb_id', this.masterId);
      formData.append('company', this.formData.company);
      formData.append('rent', this.formData.rent);
      formData.append('purchase_year', this.datePipe.transform(new Date(this.formData.purchase_year), 'dd-MM-yyyy'));
      formData.append('quantity', this.formData.quantity);
      formData.append('type_id', this.formData.type_id);
      if (this.formRadio) {
        formData.append('govt_scheme', this.formData.govt_scheme);
      }
      // this.chcFmbService.addchcfmbMachinery(formData).subscribe((res: any) => {
      //   if (res == true || res) {
      //     this.toastr.success(res.message);
      //     this.getAllMachineryList();
      //     machineryForm.reset();
      //   } else {
      //     this.toastr.error('Something went wrong.');
      //   }
      // });
    }
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "jpg") {
      return true;
    }
    else {
      return false;
    }
  }
  editData(row) {
    this.isEdit = true;
    this.formData.id = row.id;
    this.formData.capacity = row.equipment_capacity;
    this.formData.rent = row.rent_per_day;
    // this.formData.company = row.
    this.formData.purchase_year = row.equip_purchase_year;
    this.formData.quantity = row.quantity_avail;
    // this.formData.type_id = row.
    this.formData.govt_scheme = row.govt_scheme_assistant;
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }
  deleteMachinery(id) {
    this.chcFmbService.deleteMachinery(id).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success(res.message);
        this.getAllMachineryList();

      } else {
        this.toastr.error('Something went wrong.');
      }
    })
  }
  updateMachinery(machineryForm) {
    machineryForm.control.markAllAsTouched()
    if (machineryForm.valid) {
      const formData: FormData = new FormData();
      !!this.fileToUpload ? formData.append('file', this.fileToUpload) : '';
      formData.append('capacity', this.formData.capacity);
      formData.append('chc_fmb_id', this.masterId);
      formData.append('company', this.formData.company);
      formData.append('id', this.formData.id);
      formData.append('purchase_year', this.datePipe.transform(new Date(this.formData.purchase_year), 'dd-MM-yyyy'));
      formData.append('quantity', this.formData.quantity);
      formData.append('type_id', this.formData.type_id);
      if (this.formRadio) {
        formData.append('govt_scheme', this.formData.govt_scheme);
      }
      this.chcFmbService.updatechcfmbMachinery(this.formData.id, formData).subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success(res.message);
          this.getAllMachineryList();
          machineryForm.reset();
        } else {
          this.toastr.error('Something went wrong.');
        }
      });
    }
  }
}
