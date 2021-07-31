import { Collection } from "mongodb";
import { getResolvers } from "./resolvers";

test("getProperties", async () => {
    const response = {hello: "world"};
    const collection = {find: jest.fn(() => ({toArray: () => response}))} as unknown as Collection;
    expect(await getResolvers(collection).getProperties()).toEqual(response);
    expect(collection.find).toBeCalledWith();
});

test("addProperty", async () => {
    const collection = {insertOne: jest.fn()} as unknown as Collection;
    expect(await getResolvers(collection).addProperty({property: {id: "123", name: "House 1"}})).toBe(true);
    expect(collection.insertOne).toBeCalledWith({id: "123", name: "House 1"});
});

test("editProperty", async () => {
    const collection = {updateOne: jest.fn()} as unknown as Collection;
    expect(await getResolvers(collection).editProperty({property: {id: "123", name: "House 1"}})).toBe(true);
    expect(collection.updateOne).toBeCalledWith({id: "123"}, {$set: {id: "123", name: "House 1"}});
});

test("deleteProperty", async () => {
    const collection = {deleteOne: jest.fn()} as unknown as Collection;
    expect(await getResolvers(collection).deleteProperty({property: {id: "123", name: "House 1"}})).toBe(true);
    expect(collection.deleteOne).toBeCalledWith({id: "123"});
});
