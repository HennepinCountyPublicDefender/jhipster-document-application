import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'person',
                loadChildren: './person/person.module#JhipsterDocumentApplicationPersonModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#JhipsterDocumentApplicationDocumentModule'
            },
            {
                path: 'content',
                loadChildren: './content/content.module#JhipsterDocumentApplicationContentModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDocumentApplicationEntityModule {}
