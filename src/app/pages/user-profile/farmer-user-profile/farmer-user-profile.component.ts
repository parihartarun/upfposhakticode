import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer-user-profile',
  templateUrl: './farmer-user-profile.component.html',
  styleUrls: ['./farmer-user-profile.component.css']
})
export class FarmerUserProfileComponent implements OnInit {
  roleType:any
  constructor() { }

  ngOnInit(): void {
    this.roleType = localStorage.getItem('userRole')
  }

}
