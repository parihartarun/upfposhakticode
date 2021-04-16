import { Component, OnInit } from '@angular/core';
import { schemaService } from '../../../_services/schemas/schemas.service'



@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css']
})
export class SchemasComponent implements OnInit {
  viewSchema = { srno: "", description: '', date: '', view: '' }
  SchemasList: any;
  p:any;
  searchText = '';
  type = '';

  constructor(
    private schemaapi: schemaService,
  ) { }

  ngOnInit(): void {
    this.tabtype('Seeds');
    this.type = 'Seeds';
  }
  tabtype(type) {
    this.type = type;
    this.schemaapi.getDashboardData(type).subscribe(response => {
      console.log(response);
      this.SchemasList = response;
    });
  }

}
