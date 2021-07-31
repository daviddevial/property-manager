import { Collection } from "mongodb";
import { Property } from "./types";

// The root provides a resolver function for each API endpoint
export function getResolvers(collection: Collection) {
    return {
        // Return array of all records found in the collection
        getProperties: async () => {
            const results = await collection.find();
            return results.toArray();
        },

        // Add new property to the collection
        addProperty: async ({property}: {property: Property}) => {
            try {
                await collection.insertOne(property);
            return true;
            } catch(e) {
                console.warn("Failed to add property", e);
                return false;
            }
        },

        // Edit existing property in the collection
        editProperty: async ({property}: {property: Property}) => {
            try {
                await collection.updateOne({id: property.id}, {$set: property});
                return true;
            } catch(e) {
                console.warn("Failed to edit property", e);
                return false;
            }
        },

        // Delete exisitng property from the collection
        deleteProperty: async ({property}: {property: Property}) => {
            try {
                await collection.deleteOne({id: property.id});
                return true;
            } catch(e) {
                console.warn("Failed to delete property", e);
                return false;
            }
        }
    };
}
