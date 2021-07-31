export interface Property {
    id: string;
    name: string;
}

export interface GQLResponse {
    errors: Array<{
        message: string;
    }>;
    data: any;
}