import React from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import algoliasearch from 'algoliasearch/lite';
import { findResultsState } from 'react-instantsearch-dom/server';
import { SearchApp } from '@/components/misc/instantsearch';
import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';


let algoliaClient = algoliasearch(
    'U8HQ2JB0PM',
    '7e96139a08986a2e3ee6847761b68f6d',
    {
      _useRequestCache: true,
    }
);


const searchClient = {
  search(requests) {
    const shouldSearch = requests.some(({ params: { query }}) => query !== '');
    if (shouldSearch) {
      return algoliaClient.search(requests);
    }
    return Promise.resolve({
      results: [{ hits: [] }],
    });
  },
  searchForFacetValues: algoliaClient.searchForFacetValues,
};



const updateAfter = 700;

const createURL = (state) => `?${qs.stringify(state)}`;

const pathToSearchState = (path) =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

const searchStateToURL = (searchState) =>
  searchState ? `${window.location.pathname.replace('/artigos','')}?${qs.stringify(searchState)}` : '';

const DEFAULT_PROPS = {
  searchClient,
  indexName: 'Posts'
};


export default function SearchAppFields(props) {
  const [searchState, setSearchState] = React.useState({});
  const router = useRouter();
  const debouncedSetState = React.useRef();

  React.useEffect(() => {
    if (router) {
      router.beforePopState(({ url }) => {
        setSearchState(pathToSearchState(url));
      });
    }
  }, [router]);



  return (
    <div >
      <SearchApp
        {...DEFAULT_PROPS}
        searchState={searchState}
        resultsState={props.resultsState}
        onSearchStateChange={(nextSearchState) => {
          clearTimeout(debouncedSetState.current);

          debouncedSetState.current = setTimeout(() => {
            const href = searchStateToURL(nextSearchState);

            router.push(href, href, { shallow: true });
          }, updateAfter);

          setSearchState(nextSearchState);
        }}
        createURL={createURL}
      />
    </div>
  );
}

// export async function getServerSideProps({ resolvedUrl }) {
//   const searchState = pathToSearchState(resolvedUrl);
//   const resultsState = await findResultsState(SearchApp, {
//     ...DEFAULT_PROPS,
//     searchState,
//   });

//   return {
//     props: {
//       resultsState: JSON.parse(JSON.stringify(resultsState)),
//       searchState,
//     },
//   };
// }