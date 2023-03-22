/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation MyMutation ($id: ID!) {\n    deleteDriver(id: $id) {\n      data {\n        attributes {\n          name\n        }\n      }\n    }\n  }\n": types.MyMutationDocument,
    "\n  query AllDrivers {\n    drivers(sort: \"id:DESC\") {\n      data {\n        id\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.AllDriversDocument,
    "\n  query DriverById($id: ID!) {\n    driver(id: $id) {\n      data {\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.DriverByIdDocument,
    "\n  mutation CreateDriver($name: String, $surname: String, $status: ID) {\n    createDriver(data: { name: $name, surname: $surname, status: $status }) {\n      data {\n        id\n      }\n    }\n  }\n": types.CreateDriverDocument,
    "\n  mutation UpdateDriverProfile($id: ID!, $name: String, $surname: String) {\n    updateDriver(data: { name: $name, surname: $surname }, id: $id) {\n      data {\n        id\n      }\n    }\n  }\n": types.UpdateDriverProfileDocument,
    "\n  mutation UpdateDriverStatus($id: ID!, $status: ID) {\n    updateDriver(data: { status: $status }, id: $id) {\n      data {\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n": types.UpdateDriverStatusDocument,
    "\n  query StatusByName($statusName: String) {\n    statuses(filters: { statusName: { eq: $statusName } }) {\n      data {\n        id\n        attributes {\n          statusName\n        }\n      }\n    }\n  }\n": types.StatusByNameDocument,
    "\n  query AllStatus {\n    statuses {\n      data {\n        attributes {\n          statusName\n        }\n      }\n    }\n  }\n": types.AllStatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MyMutation ($id: ID!) {\n    deleteDriver(id: $id) {\n      data {\n        attributes {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MyMutation ($id: ID!) {\n    deleteDriver(id: $id) {\n      data {\n        attributes {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllDrivers {\n    drivers(sort: \"id:DESC\") {\n      data {\n        id\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllDrivers {\n    drivers(sort: \"id:DESC\") {\n      data {\n        id\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DriverById($id: ID!) {\n    driver(id: $id) {\n      data {\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DriverById($id: ID!) {\n    driver(id: $id) {\n      data {\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDriver($name: String, $surname: String, $status: ID) {\n    createDriver(data: { name: $name, surname: $surname, status: $status }) {\n      data {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDriver($name: String, $surname: String, $status: ID) {\n    createDriver(data: { name: $name, surname: $surname, status: $status }) {\n      data {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDriverProfile($id: ID!, $name: String, $surname: String) {\n    updateDriver(data: { name: $name, surname: $surname }, id: $id) {\n      data {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDriverProfile($id: ID!, $name: String, $surname: String) {\n    updateDriver(data: { name: $name, surname: $surname }, id: $id) {\n      data {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDriverStatus($id: ID!, $status: ID) {\n    updateDriver(data: { status: $status }, id: $id) {\n      data {\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDriverStatus($id: ID!, $status: ID) {\n    updateDriver(data: { status: $status }, id: $id) {\n      data {\n        attributes {\n          name\n          surname\n          status {\n            data {\n              attributes {\n                statusName\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StatusByName($statusName: String) {\n    statuses(filters: { statusName: { eq: $statusName } }) {\n      data {\n        id\n        attributes {\n          statusName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query StatusByName($statusName: String) {\n    statuses(filters: { statusName: { eq: $statusName } }) {\n      data {\n        id\n        attributes {\n          statusName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllStatus {\n    statuses {\n      data {\n        attributes {\n          statusName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllStatus {\n    statuses {\n      data {\n        attributes {\n          statusName\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;