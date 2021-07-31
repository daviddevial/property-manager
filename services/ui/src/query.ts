import { GQLResponse, Property } from "./types";

export const getPropertiesQuery = `
{
    getProperties {
        id
        name
    }
}
`;

export interface GetPropertiesResponse extends GQLResponse {
    data: {
        getProperties: Property[];
    };
}

export const addPropertyQuery = `
mutation AddProperty($property: InputProperty!) {
    addProperty(property: $property)
}
`;

export interface AddPropertyResponse extends GQLResponse {
    data: {
        addProperty: boolean;
    };
}

export const editPropertyQuery = `
mutation EditProperty($property: InputProperty!) {
    editProperty(property: $property)
}
`;

export interface EditPropertyResponse extends GQLResponse {
    data: {
        editProperty: boolean;
    };
}

export const deletePropertyQuery = `
mutation DeleteProperty($property: InputProperty!) {
    deleteProperty(property: $property)
}
`;

export interface DeletePropertyResponse extends GQLResponse {
    data: {
        deleteProperty: boolean;
    };
}