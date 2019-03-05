import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IContent } from 'app/shared/model/content.model';
import { AccountService } from 'app/core';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit, OnDestroy {
    contents: IContent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected contentService: ContentService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.contentService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IContent[]>) => res.ok),
                    map((res: HttpResponse<IContent[]>) => res.body)
                )
                .subscribe((res: IContent[]) => (this.contents = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.contentService
            .query()
            .pipe(
                filter((res: HttpResponse<IContent[]>) => res.ok),
                map((res: HttpResponse<IContent[]>) => res.body)
            )
            .subscribe(
                (res: IContent[]) => {
                    this.contents = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContent) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe('contentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
