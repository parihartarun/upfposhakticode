import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './pipe/search.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CaptionComponent } from './caption/caption.component';


@NgModule({
  declarations: [DataTableComponent, CaptionComponent, SearchPipe, SortPipe],
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule, TranslateModule
  ],
  providers: [],
  exports: [DataTableComponent, CaptionComponent,SortPipe]
})
export class DataTableModule { }
