import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { StorageUnitService } from 'src/app/_services/storage_units/storage_units.service';

import { FpoService } from '../../../_services/fpo/fpo.service';

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
    private authservice:AuthService,
    private route: Router,
    private toastr:ToastrService,
    private storageunitservice:StorageUnitService
  ) {


  }

  ngOnInit(): void {
    this.storageUnitForm = this.formBuilder.group({
      storageType: ['', [Validators.required]],
      facilities: ['', [Validators.required]],
      storageCapacity: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      isProcessingUnit: ['', [Validators.required]],
      district: [, [Validators.required]],
      block: [undefined, [Validators.required]],
      address: ['', [Validators.required]],
      washingfacility:[false, [Validators.required]],  
      sortingmachines:[false, [Validators.required]], 
      gradingmachines:[false, [Validators.required]], 
      packagingmachines:[false, [Validators.required]],
    });  
    this.splitString();
    this.getStorageUnits();
    this.getDistricts();
    

this.getFpoProfile()
  }


  reset()
  {
    this.storageUnitForm.reset();
    this.storageUnitForm.markAsPristine();
    this.storageUnitForm.markAsUntouched();
  }

splitString()
{
 let str:string = "A,C,D,D,DC,FG"
 let stt:string=""
 console.log(str.split(","))
 str.split(",").forEach(data=>{
  stt = this.prepareString(stt,data);
 })

console.log("Prepared stt = "+stt);
}

prepareString(str:string,appendValue:string)
{
  return   (str.trim().length==0 || str.trim()=="")?str+appendValue:str+","+appendValue;
}

 public bindFacilities():string
{
  var facilities = "";
if(this.storageUnitForm.get("packagingmachines")){ facilities = this.prepareString(facilities,"Packaging Machines")}
if(this.storageUnitForm.get("gradingmachines")){ facilities = this.prepareString(facilities,"Grading Machines")}
if(this.storageUnitForm.get("washingfacility")){ facilities = this.prepareString(facilities,"Washing Facility")}
if(this.storageUnitForm.get("sortingmachines")){ facilities = this.prepareString(facilities,"Sorting Machines")}
return facilities;
}

  getBlocksByDistrictId()
  {
    this.storageunitservice.getBlocksById(this.storageUnitForm.get("district").value).subscribe(data=>{
this.blocklist  = data;    
    })
  }

  public getFpoProfile()
  {
    
    var username = localStorage.getItem('username');
    
this.storageunitservice.getFpoProfileByUsername(username).subscribe(data=>{
  this.fpoProfile = data;
  this.storageUnitForm.get("district").setValue(this.fpoProfile.distRefId);
  this.getBlocksByDistrictId();
})

  }
  getDistricts() {
    this.storageunitservice.getDistrictsByStateId().subscribe(data=>{    
    this.districtlist = data;
    });
  }

  getStorageUnits(){

    this.storageunitservice.getStorageUnits().subscribe(data=>{    
      this.storageUnits = data;
      console.log("Dta oF Storage units"+JSON.stringify(data))
      });
  //   this.storageUnits = [
  //     { 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },{ 
  //       storageType:'Cold Storage',
  //       facilities:'Washing facility,Sorting machines',
  //       storageCapacity:'23',
  //       isProcessingUnit:'1',
  //       district:'pune',
  //       block:'B1',
  //       address:'pune'
  //     },
  // ]
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
    },
      err => {
        console.log(err)
      }
    );
  }
}
editStorageUnit(equipment){
  
  
  this.storageUnitForm = this.formBuilder.group({
    storageType: ['', [Validators.required]],
    facilities: ['', [Validators.required]],
    storageCapacity: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    isProcessingUnit: ['', [Validators.required]],
    district: [, [Validators.required]],
    block: [undefined, [Validators.required]],
    address: ['', [Validators.required]],
    washingfacility:[false, [Validators.required]],  
    sortingmachines:[false, [Validators.required]], 
    gradingmachines:[false, [Validators.required]], 
    packagingmachines:[false, [Validators.required]],
  });

  
  this.edit = true;
  window.scroll(0,0);  
}

addStorageUnit() {
  this.submitted = true;
  // stop here if form is invalid
  console.log(JSON.stringify(this.storageUnitForm.value))
  console.log("Prepared Facilities to dispatch = "+this.bindFacilities())
  // if (this.storageUnitForm.invalid) {
  //     return;
  // }


  
  this.storageunitservice.addStrotageUnit(this.storageUnitForm.value).subscribe(response => {
    console.log(response);
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
