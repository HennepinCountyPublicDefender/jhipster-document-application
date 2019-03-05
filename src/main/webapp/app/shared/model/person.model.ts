import { IDocument } from 'app/shared/model/document.model';

export interface IPerson {
    id?: number;
    model?: string;
    documents?: IDocument[];
}

export class Person implements IPerson {
    constructor(public id?: number, public model?: string, public documents?: IDocument[]) {}
}
