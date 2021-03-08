import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { StorageUnitService } from 'src/app/_services/storage_units/storage_units.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  edit = false;
  warehouseForm: FormGroup;
  districtlist: any;
  blocklist: any;
  warehouseList = [];
  editabileId: any;
  fascilities = [];
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService, private storageunitservice: StorageUnitService, public departmentService: DepartmentService) { }

  ngOnInit(): void {

    this.getWarehouseAll();

    this.departmentService.getDistrictBystateId(9).subscribe(data => {
      this.districtlist = data;
    });
    this.departmentService.getFacilitieseAll().subscribe(res => {
      this.fascilities = res;
    });
    this.warehouseForm = this.formBuilder.group({
      address: [''],
      block_id: [undefined],
      capacity: ['', [Validators.required]],
      district_id: [undefined],
      latitude: [''],
      longitude: [''],
      seed_processing: ['', [Validators.required]],
      facilities: [[], [Validators.required]],
      type: ['', [Validators.required]],
    });
  }
  getWarehouseAll() {
    this.departmentService.getWarehouseAll().subscribe((res: any) => {
      this.warehouseList = res;
    });
  }
  getBlocksByDistrictId() {
    this.storageunitservice.getBlocksById(this.warehouseForm.get('district_id').value).subscribe(data => {
      this.blocklist = data;
    })
  }
  addWarehouse() {
    this.submitted = true;
    console.log('facilities', this.warehouseForm.get('facilities').value.join(','));

    const formData: FormData = new FormData();
    formData.append('address', this.warehouseForm.get('address').value);
    formData.append('block_id', this.warehouseForm.get('block_id').value);
    formData.append('capacity', this.warehouseForm.get('capacity').value);
    formData.append('district_id', this.warehouseForm.get('district_id').value);
    formData.append("latitude", this.warehouseForm.get('latitude').value)
    formData.append("longitude", this.warehouseForm.get('longitude').value)
    formData.append("seed_processing", this.warehouseForm.get('seed_processing').value)
    formData.append("facilities", this.warehouseForm.get('facilities').value.join(','));
    formData.append("type", this.warehouseForm.get('type').value)

    if (this.warehouseForm.valid) {
      this.departmentService.addWarehouse(formData).subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success(res.message);
          this.warehouseForm.reset();
          this.getWarehouseAll();
          // this.isEdit = false;
        } else {
          this.toastr.error('Error! While Updated Schemes.');
        }
      });
    }
  }
  updateWarehouse() {
    this.submitted = true;
    if (this.warehouseForm.valid) {
      const formData: FormData = new FormData();
      formData.append('address', this.warehouseForm.get('address').value);
      formData.append('block_id', this.warehouseForm.get('block_id').value);
      formData.append('capacity', this.warehouseForm.get('capacity').value);
      formData.append('district_id', this.warehouseForm.get('district_id').value);
      formData.append("latitude", this.warehouseForm.get('latitude').value);
      formData.append("longitude", this.warehouseForm.get('longitude').value);
      formData.append("seed_processing", this.warehouseForm.get('seed_processing').value);
      formData.append("facilities", this.warehouseForm.get('facilities').value.join(','));
      formData.append("type", this.warehouseForm.get('type').value)
      this.departmentService.updateWarehouse(this.editabileId, formData).subscribe((res: any) => {
        if (res == true || res) {
          this.toastr.success(res.message);
          this.warehouseForm.reset();
          this.getWarehouseAll();
          this.editabileId = null;
          // this.isEdit = false;
        } else {
          this.toastr.error('Error! While Updated Schemes.');
        }
      });
    }
  }
  resetForm() {
    this.submitted = false;
    this.warehouseForm.reset();
    this.editabileId = null;
  }
  editWarehouse(row) {
    window.scroll(0, 0);
    this.editabileId = row.id;
    this.warehouseForm.patchValue({
      address: row.address,
      block_id: row.block_id,
      // block_id: '804',
      capacity: row.capacity,
      district_id: row.district_id,
      // district_id: 118,
      latitude: row.latitude,
      longitude: row.longitude,
      seed_processing: row.is_seed_processing,
      facilities: row.warehouse_facilities.split(','),
      type: row.warehouse_type
    });
    this.getBlocksByDistrictId();
  }
  deleteWarehouse(id) {
    this.departmentService.deleteWarehouse(id).subscribe(res => {
      if (res == true || res) {
        this.toastr.success(res.message);
        this.warehouseForm.reset();
        this.getWarehouseAll();
        this.editabileId = null;
        // this.isEdit = false;
      } else {
        this.toastr.error('Error! While Updated Schemes.');
      }
    });
  }
  get formControls() {
    return this.warehouseForm.controls;
  }
}
