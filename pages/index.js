import React from 'react';
import { Configure } from 'react-instantsearch-dom';
import {
  InstantSearch,
  SearchBox,
  Hits,
} from 'react-instantsearch-dom';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: "usay3xpxxxxxxxxxx-1.a1.typesense.net",
        port: '443',
        protocol: 'https',
      },
    ],
    apiKey: "XwgcfcpwAjxxxxxxxxxxxxxxxxxxxxxx",
  },
  additionalSearchParameters: {
    query_by: 'title,author',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default function Home() {
    return(
      <InstantSearch indexName="mp_books" searchClient={searchClient}>
        <SearchBox />
        <Configure hitsPerPage={15} />
        <Hits />
      </InstantSearch>
    );
  }