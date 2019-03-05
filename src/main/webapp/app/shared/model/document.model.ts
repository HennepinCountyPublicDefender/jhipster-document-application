import { IContent } from 'app/shared/model/content.model';
import { IPerson } from 'app/shared/model/person.model';

export interface IDocument {
    id?: number;
    title?: string;
    size?: number;
    mimeType?: string;
    content?: IContent;
    person?: IPerson;
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public title?: string,
        public size?: number,
        public mimeType?: string,
        public content?: IContent,
        public person?: IPerson
    ) {}
}
