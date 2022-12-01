import React from 'react';
import { Configure } from 'react-instantsearch-dom';
import { RefinementList } from 'react-instantsearch-dom';
import { connectNumericMenu } from 'react-instantsearch-dom';
import { NumericMenu } from 'react-instantsearch-dom';
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectAutoComplete,
} from 'react-instantsearch-dom';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { Card } from '../components/Card';
import CustomSearchBox from '../components/Searchbox';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: "usay3xpekim1nrhdp-1.a1.typesense.net",
        port: '443',
        protocol: 'https',
      },
    ],
    apiKey: "XwgcfcpwAj8nO9GnvR0XiaD6N48or9Bz",
  },
  additionalSearchParameters: {
    query_by: 'title,author',
    sort_by: "book_id:desc",
    filterClicked: true,
    highlight_full_fields: 'title,author',
    'facet_by'  : 'author,binding,price',
    "max_facet_values":500000,
  },
  connectionTimeoutSeconds: 5,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <div>
      {/* <input
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
      /> */}
      {currentRefinement.length>0?
      <div style={{border:"1px solid",width:"35rem"}}>
        {hits.map(hit => (
          <p style={{margin:'0rem 0',padding:'0.5rem 1rem',border:'1px solid grey'}} key={hit.book_id}>{hit.title},{hit.author}</p>
        ))}
      </div>:null
      }
  </div>
);
const CNumericMenu = ({ items, refine, createURL }) => (
  <ul>
    {items.map(item => (
      <li key={item.value}>
        <a
          href={createURL(item.value)}
          style={{ fontWeight: item.isRefined ? 'bold' : '' }}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
);

const CustomNumericMenu = connectNumericMenu(CNumericMenu);

const CustomAutocomplete = connectAutoComplete(Autocomplete);
export default function Home() {
  // const hit = {Hit}
  const [checker, setchecker] = React.useState(false)
  // React.useEffect(() => {
  //   setTimeout(() => {
  //   }, 3000);
  //   setchecker(true)
  // }, [checker])
    return(
      <InstantSearch indexName="mp_books_6" searchClient={searchClient}>
        <CustomSearchBox/>
        <CustomAutocomplete/>
        <RefinementList className="mt-8" attribute="author" />
        <RefinementList className="mt-8" attribute="binding" />
        {/* <RefinementList className="mt-8" attribute="new_pricing" /> */}

        <CustomNumericMenu
          attribute="price"
          items={[
            { label: '<= 10', end: 10 },
            { label: '10 - 100', start: 10, end: 100 },
            { label: '100 - 500', start: 100, end: 500 },
            { label: '>= 500', start: 500 },
          ]}
        />

        <Configure hitsPerPage={10} />
        <Hits hitComponent={Card}/>
        
      </InstantSearch>
    );
  }