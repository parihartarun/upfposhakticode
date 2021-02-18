import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { StorageUnitService } from 'src/app/_services/storage_units/storage_units.service';



@Component({
  selector: 'app-storage-unit',
  templateUrl: './storage-unit.component.html',
  styleUrls: ['./storage-unit.component.css']
})
export class StorageUnitComponent implements OnInit {

  storageUnitForm: FormGroup;
  submitted = false;
  storageUnits:Array<any>=[];
  p:number = 1;
  districtlist: any;
  fpoProfile: any;
  blocklist: any;
  edit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService,
    private storageunitservice:StorageUnitService
  ) {}

  ngOnInit(): void {
    this.storageUnitForm = this.formBuilder.group({
      storageType: ['', [Validators.required]],
      fascilities: [''],
      storageCapacity: ['', [Validators.required]],
      isseedprocessingunit: ['', [Validators.required]],
      distId: [''],
      blockId: [''],
      stateId:[''],
      address: [''],
      washingfacility:[false],  
      sortingmachines:[false], 
      gradingmachines:[false], 
      packagingmachines:[false],
      fpoRefId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
      id:['']
    });  
    
    this.getStorageUnits();
    this.getDistricts();
  }

  reset(){
    this.storageUnitForm.reset();
    this.storageUnitForm.markAsPristine();
    this.storageUnitForm.markAsUntouched();
    this.submitted = false;
  }

  prepareString(str:string,appendValue:string){
    return   (str.trim().length==0 || str.trim()=="")?str+appendValue:str+","+appendValue;
  }

  public bindFacilities():string{
    var fascilities = "";
    if(this.storageUnitForm.get("packagingmachines").value){ fascilities = this.prepareString(fascilities,"Packaging machines")}
    if(this.storageUnitForm.get("gradingmachines").value){ fascilities = this.prepareString(fascilities,"Grading machines")}
    if(this.storageUnitForm.get("washingfacility").value){ fascilities = this.prepareString(fascilities,"Washing facility")}
    if(this.storageUnitForm.get("sortingmachines").value){ fascilities = this.prepareString(fascilities,"Sorting machines")}
    return fascilities;
  }

  getBlocksByDistrictId(distId = null){
    var districtId;
    if(distId != null){
      districtId = distId;
    }else{
      districtId = this.storageUnitForm.get("distId").value;
    }
    console.log(districtId);

    this.storageunitservice.getDsitrictById(districtId).subscribe(res=>{
      this.storageUnitForm.patchValue({
        stateId: res.state_id, 
      });
    })
    this.storageunitservice.getBlocksById(districtId).subscribe(data=>{
      console.log(data);
      this.blocklist  = data;    
    })
  }

  getDistricts() {
    const id = Number(localStorage.getItem('masterId'))
    this.storageunitservice.getDistrictByFpoId(localStorage.getItem('masterId')).subscribe(data=>{   
      console.log(data); 
      this.districtlist = [data];
      this.storageUnitForm.patchValue({
        distId: data.district_id
      })
      this.getBlocksByDistrictId(data.district_id);
    });
  }

  getStorageUnits(){
    this.storageunitservice.getStorageUnits(localStorage.getItem('masterId')).subscribe(data=>{    
      this.storageUnits = data;
      console.log(data)
    });
  }

  confirmDelete(equipmentId){
    if(confirm("Are you sure to delete this item.")) {
      this.storageunitservice.deleteStrotageUnit(equipmentId).subscribe(response => {
        console.log(response);
        if(response == true){
          this.toastr.success('Storage Unit Deleted successfully.');
        }else{
            this.toastr.error('Error! While Deleting Storage Unit.');
        }
        this.getStorageUnits()
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  editCollectionCenter(equipment){
    this.getBlocksByDistrictId(equipment.distId);
    console.log(equipment);
    this.storageUnitForm = this.formBuilder.group({
      storageType: [equipment.storageType, [Validators.required]],
      fascilities: ['', [Validators.required]],
      storageCapacity: [equipment.storageCapacity, [Validators.required]],
      isseedprocessingunit: [equipment.isseedprocessingunit, [Validators.required]],
      distId: [equipment.distId , [Validators.required]],
      blockId: [equipment.blockId, [Validators.required]],
      stateId:[equipment.stateId,],
      address: [equipment.address, [Validators.required]],
      washingfacility:[false, [Validators.required]],  
      sortingmachines:[false, [Validators.required]], 
      gradingmachines:[false, [Validators.required]], 
      packagingmachines:[false, [Validators.required]],
      fpoRefId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
      id:[equipment.id],
    });
    setTimeout(()=>{
      this.storageUnitForm.patchValue({
        blockId:equipment.blockId
      });
    }, 3000);
    if(equipment.fascilities != '' && equipment.fascilities != null){
      this.splitString(equipment.fascilities)
    }
    this.edit = true;
    window.scroll(0,0);  
  }

  updateStrotageUnit(){
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.storageUnitForm.value);
    this.storageUnitForm.patchValue({
      fascilities: this.bindFacilities(), 
    });
    if (this.storageUnitForm.invalid) {
        return;
    }

    var finalData = this.storageUnitForm.value;
    delete finalData.gradingmachines;
    delete finalData.sortingmachines;
    delete finalData.washingfacility;
    delete finalData.packagingmachines;
    this.storageunitservice.updateStrotageUnit(finalData, finalData.id).subscribe(response => {
      console.log(response);
      this.toastr.success('Storage unit updated successfully.');
      this.edit = false;
      this.reset();
      this.getStorageUnits();
    },
      err => {
        console.log(err)
      }
    );
  }

  splitString(str){
    console.log(str);
    let stt:string=""
    if(str != null){
      str.split(",").forEach(data=>{
        console.log(data);
        if(data == 'Packaging machines'){
          this.storageUnitForm.patchValue({
            packagingmachines: true, 
          });
        }

        if(data == 'Grading machines'){
          this.storageUnitForm.patchValue({
            gradingmachines: true, 
          });
        }

        if(data == 'Washing facility'){
          this.storageUnitForm.patchValue({
            washingfacility: true, 
          });
        }

        if(data == 'Sorting machines'){
          this.storageUnitForm.patchValue({
            sortingmachines: true, 
          });
        }
        stt = this.prepareString(stt,data);
      })
    }
  }

  addStorageUnit() {
    this.submitted = true;
    // stop here if form is invalid
    this.storageUnitForm.patchValue({
      fascilities: this.bindFacilities(), 
    });

    this.storageUnitForm.patchValue({
      fpoRefId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId')
    });
    var finalData = this.storageUnitForm.value;
    delete finalData.gradingmachines;
    delete finalData.sortingmachines;
    delete finalData.washingfacility;
    delete finalData.packagingmachines;

    console.log(finalData);
    if (this.storageUnitForm.invalid) {
        return;
    }
    this.storageunitservice.addStrotageUnit(finalData).subscribe(response => {
      console.log(response);
      this.toastr.success('Storage unit added successfully.');
      this.reset();
      this.getStorageUnits();
    },
      err => {
      console.log(err)
      }
    );
  }

  get formControls(){
    return this.storageUnitForm.controls;
  }


}
