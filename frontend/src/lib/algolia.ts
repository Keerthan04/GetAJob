//to implement the search functionality

import { liteClient as algoliasearch } from "algoliasearch/lite";

const ALGOLIA_APP_ID = import.meta.env.VITE_APPLICATION_ID!;
const ALGOLIA_SEARCH_KEY = import.meta.env.VITE_SEARCH_API_KEY!;
const ALGOLIA_INDEX_NAME = import.meta.env.VITE_ALGOLIA_INDEX_NAME!;
const ALGOLIA_WRITE_KEY = import.meta.env.VITE_WRITE_API_KEY!;

export const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
export const writeClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_KEY);
export const indexName = ALGOLIA_INDEX_NAME;


