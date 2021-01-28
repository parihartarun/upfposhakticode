import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FpoService } from '../../_services/fpo/fpo.service';

@Component({
  selector: 'app-fpo-details',
  templateUrl: './fpo-details.component.html',
  styleUrls: ['./fpo-details.component.css']
})
export class FpoDetailsComponent implements OnInit {

  closeResult: string;
  fpo = {};
  constructor(private modalService: NgbModal, private api: FpoService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe(params => {
      let fpoId = Number(params.get('id'));
      this.api.getfpoDetialById(fpoId).subscribe(f => {
        this.fpo=f
      })   
    });
   
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
