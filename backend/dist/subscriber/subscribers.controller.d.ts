import { SubscribersService } from './subscribers.service';
import { Subscriber } from './subscriber.model';
export declare class SubscribersController {
    private readonly subscribersService;
    constructor(subscribersService: SubscribersService);
    findAll(): Promise<Subscriber[]>;
    findOne(id: string): Promise<Subscriber>;
    create(body: {
        name: string;
        email: string;
        subscriptionDate: string;
    }): Promise<any>;
}
