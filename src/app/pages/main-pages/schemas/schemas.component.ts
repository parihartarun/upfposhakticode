import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/_services/language.service';
import { schemaService } from '../../../_services/schemas/schemas.service';

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css'],
})
export class SchemasComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  viewSchema = { srno: '', description: '', date: '', view: '' };
  SchemasList: any;
  p: any;
  searchText = '';
  type = '';
  schemeType = '';

  currentLang: string = '';
  constructor(
    private schemaapi: schemaService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // this.tabtype('Seeds');
    this.type = 'Seeds';

    this.getLangChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  tabtype(type) {
    this.type = type;
    this.schemeType = type;
    this.schemaapi
      .getDashboardData(type, this.currentLang)
      .subscribe((response) => {
        console.log(response);
        this.SchemasList = response;
      });
  }

  getLangChange() {
    this.subscription = this.languageService
      .getLanguage()
      .subscribe((language) => {
        console.log('scheme lang', language)
        this.currentLang = language;
        this.tabtype(this.type);
      });
  }
}
