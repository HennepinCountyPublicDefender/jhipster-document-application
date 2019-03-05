import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContent } from 'app/shared/model/content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content-delete-dialog',
    templateUrl: './content-delete-dialog.component.html'
})
export class ContentDeleteDialogComponent {
    content: IContent;

    constructor(protected contentService: ContentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contentListModification',
                content: 'Deleted an content'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-content-delete-popup',
    template: ''
})
export class ContentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ content }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.content = content;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/content', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/content', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
