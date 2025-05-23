export interface User {
    id?: number;
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: 'subscriber' | 'content_creator';
}
