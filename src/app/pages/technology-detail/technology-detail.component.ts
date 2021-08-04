import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technology-detail',
  templateUrl: './technology-detail.component.html',
  styleUrls: ['./technology-detail.component.css'],
})
export class TechnologyDetailComponent implements OnInit {
  techItem: any = {};
  techBriefList = [];

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.techItem = JSON.parse(sessionStorage.getItem('technology'));

    if (this.techItem) this.techBriefList = this.techItem.techBrief.split(',');
  }

  goBack() {
    this.location.back();
  }
}
