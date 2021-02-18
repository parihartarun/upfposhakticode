import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'ngx-caption',
    templateUrl: './caption.component.html',
    styleUrls: ['./caption.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {
        

    }
}
