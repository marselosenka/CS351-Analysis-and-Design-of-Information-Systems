import { ContentCreatorsService } from './contentCreators.service';
import { ContentCreator } from './contentCreator.model';
export declare class ContentCreatorsController {
    private readonly creatorsService;
    constructor(creatorsService: ContentCreatorsService);
    findAll(): Promise<ContentCreator[]>;
    findOne(id: string): Promise<ContentCreator>;
    create(body: {
        name: string;
        email: string;
    }): Promise<any>;
    delete(id: string): Promise<any>;
}
