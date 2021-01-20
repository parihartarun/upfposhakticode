import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-photographs',
  templateUrl: './photographs.component.html',
  styleUrls: ['./photographs.component.css']
})
export class PhotographsComponent implements OnInit {

  photographForm: FormGroup;
  submitted = false;
  photographs:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}
x
  ngOnInit(): void {
    this.photographForm = this.formBuilder.group({
      image_caption: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
    this.getPhotographs();
  }

  getPhotographs(){
    this.photographs = [
      { 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },{ 
        image_caption:'Image 1',
        file:'sed.jpg'
      },
    ]
    this.api.getPhotographs(this.photographForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  addPhotograph() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.photographForm.invalid) {
        return;
    }

    this.api.addPhotograph(this.photographForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.photographForm.controls;
  }

}
