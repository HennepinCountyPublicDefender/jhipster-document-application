import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDocumentApplicationSharedModule } from 'app/shared';
import {
    ContentComponent,
    ContentDetailComponent,
    ContentUpdateComponent,
    ContentDeletePopupComponent,
    ContentDeleteDialogComponent,
    contentRoute,
    contentPopupRoute
} from './';

const ENTITY_STATES = [...contentRoute, ...contentPopupRoute];

@NgModule({
    imports: [JhipsterDocumentApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContentComponent,
        ContentDetailComponent,
        ContentUpdateComponent,
        ContentDeleteDialogComponent,
        ContentDeletePopupComponent
    ],
    entryComponents: [ContentComponent, ContentUpdateComponent, ContentDeleteDialogComponent, ContentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDocumentApplicationContentModule {}
