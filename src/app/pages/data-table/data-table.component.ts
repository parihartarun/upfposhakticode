import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter, ContentChild, AfterContentInit, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataShowingService } from './services/data-showing.service';
import { CaptionComponent } from './caption/caption.component';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DataShowingService]
})
export class DataTableComponent implements OnInit {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private customOptions = {
        'emptyDataMessage': 'No data available in table',
        'rowClickEvent': false,
        'rowPerPageMenu': [10, 20, 50, 100],
        'rowPerPage': 10,
        'loader': false,
        'checkboxes': false,
        'rowDetailTemplate': undefined
    };
    private _options: any = {};
    private _data: any[] = [];


    @Input() tableId = 'ngxDataTableId';
    @Input() columns: any[] = [];
    @Input() set data(arr: any[]) {
        this._data = [];
        arr.forEach((item, index) => {
            this._data.push({
                ...item,
                '_autoId': index
            });
        });
    };
    get data(): any[] {
        return this._data;
    }

    @Input() set options(obj: any) {
        this._options = {
            ...this.customOptions,
            ...this._options,
            ...obj
        };
    }
    get options(): any {
        return this._options;
    }
    @Input() tableClass: any;
    @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() checkboxClick: EventEmitter<any> = new EventEmitter<any>();
    @ContentChild(CaptionComponent, { static: false }) captionRef: CaptionComponent


    searchText: string = "";
    currentPage = 1;
    orderBy: { order: string, key: string } = { order: '', key: '' };
    dataShowing: { start: number, end: number, len: number } = { start: 0, end: 0, len: 0 }
    styleParams: any = { pinnedScollerMarginLeft: 0, pinnedFlag: false };

    selectedCheckboxes = new Set();
    selectedCheckList: any[] = [];

    openRowDetailsId = new Set();

    constructor(
        private dataShowingService: DataShowingService,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.columns.map((item, i) => {
            item['sorting'] = item.hasOwnProperty('sorting') ? item['sorting'] : true;
            item['headAlign'] = item.hasOwnProperty('headAlign') ? item['headAlign'].toLowerCase() : 'left';
            item['sortingOrder'] = '';

            if ((item.hasOwnProperty('pinned') && item['pinned'] == true)) {
                /** working for pin the checkbox column */
                // this.styleParams['pinnedFlag'] = true;
                // if ( this.options.checkboxes == true && this.styleParams['pinnedFlag'] && i ==0) { 
                //     this.styleParams.pinnedScollerMarginLeft = 33;
                // }

                item['width'] = item.hasOwnProperty('width') ? item['width'] : 100;
                item['pinnedMarginLeft'] = this.styleParams.pinnedScollerMarginLeft;
                this.styleParams.pinnedScollerMarginLeft += parseInt(item['width']) + 20;
            }
        })

        this.dataShowingFn(this.currentPage, this.options.rowPerPage, this.data.length)

        /** subscription list */
        this.dataShowingService.dataShowingSubject.subscribe(subData => {
            subData['itemPerPage'] = subData.hasOwnProperty('itemPerPage') ? subData.itemPerPage : this.options.rowPerPage;
            subData['currentPage'] = subData.hasOwnProperty('currentPage') ? subData.currentPage : this.currentPage;
            subData['len'] = subData.hasOwnProperty('len') ? subData.len : this.dataShowing.len;
            this.dataShowingFn(subData.currentPage, subData.itemPerPage, subData.len)
        });

    }
    ngAfterContentInit() {
        //console.log(this.headerRef);
    }
    ngOnChanges(changes: SimpleChanges) {
        //console.log(changes);
    }
    onInputSearch() {
        this.currentPage = 1;
    }
    onChangeItemPerPage() {
        this.currentPage = 1;
        this.dataShowingService.setSataShowingSubject({ 'currentPage': this.currentPage, 'itemPerPage': this.options.rowPerPage });
    }
    onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.dataShowingService.setSataShowingSubject({ 'currentPage': currentPage });
    }
    onClickOrderBy(colItem: any, index: number) {
        if (colItem.sorting == true) {
            this.columns.map((item) => { item.sortingOrder = '' });
            this.orderBy = {
                ...this.orderBy,
                'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
                'key': colItem.key
            };
            this.columns[index]['sortingOrder'] = this.orderBy.order;
        }
    }
    onRowClick(item: any) {
        if (this.options.rowClickEvent)
            this.rowClick.emit(item);
    }

    onCheckboxSelect(rowObj: any) {
        if (this.selectedCheckboxes.has(rowObj._autoId)) {
            this.selectedCheckboxes.delete(rowObj._autoId);
            this.selectedCheckList = this.selectedCheckList.filter(item => {
                return item._autoId != rowObj._autoId;
            });
        }
        else {
            this.selectedCheckboxes.add(rowObj._autoId);
            this.selectedCheckList.push(rowObj);
        }
        this.checkboxClick.emit(this.selectedCheckList);
    }
    onCheckboxSelectAll(checked) {
        this.selectedCheckboxes = new Set();
        this.selectedCheckList = [];
        if (checked) {
            this.selectedCheckList = this.data.filter(item => {
                this.selectedCheckboxes.add(item._autoId);
                return true;
            });
        }
        this.checkboxClick.emit(this.selectedCheckList);
    }
    onClickRowDettailArrowOpen(rowObj: any) {
        if (this.openRowDetailsId.has(rowObj._autoId)) {
            this.openRowDetailsId.delete(rowObj._autoId);
        }
        else {
            this.openRowDetailsId.add(rowObj._autoId);
        }
    }
    onClickRowDettailAllArrowOpen() {
        if (this.openRowDetailsId.size != this.data.length) {
            this.openRowDetailsId = new Set();
            this.data.filter(item => {
                this.openRowDetailsId.add(item._autoId);
                return true;
            });
        }
        else {
            this.openRowDetailsId = new Set();
        }


    }

    identify(index, item) {
        return index;
    }
    private dataShowingFn(currentPage, itemPerPage, length) {
        this.dataShowing.start = length == 0 ? 0 : ((currentPage - 1) * itemPerPage) + 1;
        this.dataShowing.end = currentPage * itemPerPage > length ? length : currentPage * itemPerPage;
        this.dataShowing.len = length;
    }

}
