import { Component, OnInit } from '@angular/core';
import { schemaService } from '../../_services/schemas/schemas.service'



@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css']
})
export class SchemasComponent implements OnInit {
  viewSchema = { srno: "", description: '', date: '', view: '' }
  SchemasList: any;
  p:any;

  constructor(
    private schemaapi: schemaService,
  ) { }

  ngOnInit(): void {
    this.tabtype('Seeds');
  }
  tabtype(type) {
    this.schemaapi.getDashboardData(type).subscribe(response => {
      console.log(response);
      this.SchemasList = response;
    });
  }

}
