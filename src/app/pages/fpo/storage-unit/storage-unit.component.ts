import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.storageUnitForm = this.formBuilder.group({
      storageType: ['', [Validators.required]],
      facilities: ['', [Validators.required]],
      storageCapacity: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      isProcessingUnit: ['', [Validators.required]],
      district: ['', [Validators.required]],
      block: ['', [Validators.required]],
      address: ['', [Validators.required]],
      fpoRefId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId')
    });
    this.getStorageUnits();
  }

  getStorageUnits(){
    this.storageUnits = [
      { 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },{ 
        storageType:'Cold Storage',
        facilities:'Washing facility,Sorting machines',
        storageCapacity:'23',
        isProcessingUnit:'1',
        district:'pune',
        block:'B1',
        address:'pune'
      },
  ]
}

addStorageUnit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.storageUnitForm.invalid) {
      return;
  }

  this.api.addStorageUnit(this.storageUnitForm.value).subscribe(response => {
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
