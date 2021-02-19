import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-crop-showing-details',
  templateUrl: './crop-showing-details.component.html',
  styleUrls: ['./crop-showing-details.component.css']
})
export class CropShowingDetailsComponent implements OnInit {
  closeResult = '';

  cropSowingForm: FormGroup;
  cropSowingUpdateForm: FormGroup;
  farmerForm:FormGroup;
  submitted = false;
  equipments:Array<any>=[];
  farmers:Array<any>=[];
  crops:Array<any>=[];
  cropVarieties:Array<any>=[];
  varieties:Array<any>=[];
  seasons:Array<any>=[];
  data:Array<any>=[];
  p:number = 1;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cropSowingForm  = this.formBuilder.group({
      list: this.formBuilder.array([this.initItemRows()]),
      farmerId: ['', [Validators.required]],
      guardianName: [''],
      seasonRefName: ['',[Validators.required]],
      baseland:[''],
      masterId:localStorage.getItem('masterId'),
    });
    this.getCropSowingDetails();
    this.getFarmers();
    this.getCropList();
    this.getSeasonList();
  }

  initItemRows() {
    return this.formBuilder.group({
      sowingArea: ['', [Validators.required]],
      cropRefName: [undefined, [Validators.required]],
      verietyRef: [undefined,[Validators.required]],
      expectedYield:['', [Validators.required]],
      actualYield:['', [Validators.required]],
      marketableQuantity:['', [Validators.required]],
      masterId:localStorage.getItem('masterId'),
      sowingId:[''],
      crop_id:['']
    });
  }

  get formArr() {
    return this.cropSowingForm.get('list') as FormArray;
  }
  
  addNewRow() {
    let varlist  =  this.cropSowingForm.get('list') as FormArray;
    varlist.push(this.initItemRows());
    return varlist;
  }
  
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  getFarmers(){
    this.api.getFarmerDetailList(localStorage.getItem('masterId')).subscribe(
      response => {
      console.log(response);
      this.farmers = response;
    })
  }

  getSeasonList(){
    this.api.getSeasonList().subscribe(
      response => {
      console.log(response);
      this.seasons = response;
    })
  }

  getCropList(){
    this.api.getCropList().subscribe(
      response => {
      console.log(response);
      this.crops = response;
    })
  }

  getCropVarietiesByCropId(cropId,i){
    console.log(cropId, i);
    let list = this.cropSowingForm.get('list') as FormArray
    list.at(i).get("cropRefName").setValue(cropId)
    console.log(cropId);
    this.api.getCropVarietiesByCropId(cropId).subscribe(
      response => {
      console.log(response);
      this.cropVarieties = response;
    })
  }

  setCropVarieties(event,i){
    let list = this.cropSowingForm.get('list') as FormArray
    list.at(i).get("verietyRef").setValue(event)
  }
  
  getFarmerDetails(farmerId){
    this.api.getFarmerDetailsForCropSowing(farmerId).subscribe(response => {
      console.log(response);
      if(response != null){
        this.cropSowingForm.controls.baseland.patchValue(response.land_area);
        this.cropSowingForm.controls.guardianName.patchValue(response.parantsName);
      }
    },
      err => {
        console.log(err)
      }
    );
    // this.api.getFarmerCropSowingDetails({'masterId':localStorage.getItem('masterId'), 'farmerId':farmerId}).subscribe(response => {
    //   console.log(response);
    //   let list = this.cropSowingForm.get('list') as FormArray
    //   list.removeAt(0);
    //   response.forEach(x => {
    //     let d = {
    //       sowingArea: [x.sowing_area, [Validators.required]],
    //       cropRefName: [x.crop_master_id, [Validators.required]],
    //       verietyRef: [x.veriety_id,[Validators.required]],
    //       expectedYield:[x.ex_yield, [Validators.required]],
    //       actualYield:[x.actual_yield, [Validators.required]],
    //       marketableQuantity:[x.marketable_quantity, [Validators.required]],
    //       masterId:localStorage.getItem('masterId'),
    //       sowingId:[x.sowing_id],
    //       crop_id:[x.crop_id]
    //     }
    //     console.log(x)
    //     list.push(this.formBuilder.group(d));
    //   })
    // },
    //   err => {
    //     console.log(err)
    //   }
    // );
  }

  getCropSowingDetails(){
    this.api.getFarmerCropSowingDetails({'masterId':localStorage.getItem('masterId')}).subscribe(response => {
      console.log(response);
      this.data = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  addSowingDetails(){
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.cropSowingForm.value);
    if (this.cropSowingForm.invalid) {
        return;
    }

    var data = this.cropSowingForm.value;
    this.api.addFarmerCropSowingDetails(data).subscribe(response => {
      console.log(response);
      this.toastr.success('Crop sowing details added successfully.');
      this.submitted = false;
      this.cropSowingForm.reset();
      this.getCropSowingDetails();
    },
      err => {
        console.log(err)
      }
    );
  }

  editCropSowingDetails(data, content){
    console.log(data);
    this.getVarieties(data.crop_master_id);
    this.cropSowingUpdateForm  = this.formBuilder.group({
      farmerId: [data.farmer_id, [Validators.required]],
      guardianName: [data.father_husband_name],
      seasonRefName: [data.season_ref,[Validators.required]],
      baseland:[data.land_area],
      sowingArea: [data.sowing_area, [Validators.required]],
      cropRefName: [data.crop_master_id, [Validators.required]],
      verietyRef: [data.veriety_ref,[Validators.required]],
      expectedYield:[data.ex_yield, [Validators.required]],
      actualYield:[data.actual_yield, [Validators.required]],
      marketableQuantity:[data.marketable_quantity, [Validators.required]],
      sowingId:[data.sowing_id],
      crop_id:[data.crop_id],
      masterId:localStorage.getItem('masterId'),
    });
    setTimeout(()=>{     
      this.cropSowingUpdateForm.patchValue({
        cropRefName:data.crop_master_id,
        verietyRef:data.veriety_ref
      });
    }, 2000);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateSowingDetails(){
    console.log(this.cropSowingUpdateForm.value);
  }

  getVarieties(cropId){
    this.api.getCropVarietiesByCropId(cropId).subscribe(
      response => {
        console.log(response);
      this.varieties = response;
    })
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
