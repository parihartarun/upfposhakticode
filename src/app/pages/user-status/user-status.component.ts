import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  status: any;

  
  constructor() { }

  ngOnInit(): void {
  }

  selectvalue(type)
  {
   console.log(type);
   this.status = type;
  }

}
