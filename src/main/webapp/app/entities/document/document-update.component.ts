import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IContent } from 'app/shared/model/content.model';
import { ContentService } from 'app/entities/content';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-document-update',
    templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
    document: IDocument;
    isSaving: boolean;

    contents: IContent[];

    people: IPerson[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected documentService: DocumentService,
        protected contentService: ContentService,
        protected personService: PersonService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
        this.contentService
            .query({ filter: 'document-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IContent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContent[]>) => response.body)
            )
            .subscribe(
                (res: IContent[]) => {
                    if (!this.document.content || !this.document.content.id) {
                        this.contents = res;
                    } else {
                        this.contentService
                            .find(this.document.content.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IContent>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IContent>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IContent) => (this.contents = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.personService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPerson[]>) => response.body)
            )
            .subscribe((res: IPerson[]) => (this.people = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackContentById(index: number, item: IContent) {
        return item.id;
    }

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }
}
