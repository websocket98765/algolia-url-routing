import React from 'react';
import qs from 'qs';
import { useLocation, useHistory } from 'react-router-dom';
import {
  InstantSearch,
  Hits,
  Menu,
  Pagination,
  PoweredBy,
  SearchBox,
  ClearRefinements
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import ProductTypeRefinements from './ProductTypeRefinements';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const DEBOUNCE_TIME = 700;

const createURL = (state) => `?${qs.stringify(state)}`;

const searchStateToUrl = (location, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : '';

const urlToSearchState = (location) => qs.parse(location.search.slice(1));

function App() {
  const location = useLocation();
  const history = useHistory();
  const [searchState, setSearchState] = React.useState(
    urlToSearchState(location)
  );
  const setStateId = React.useRef();

  React.useEffect(() => {
    const nextSearchState = urlToSearchState(location);

    if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
      setSearchState(nextSearchState);
    }

    // eslint-disable-next-line
  }, [location]);

  function onSearchStateChange(nextSearchState) {
    console.log('onSearchStateChange() called');

    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      history.push(
        searchStateToUrl(location, nextSearchState),
        nextSearchState
      );
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName='instant_search'
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
          }}>
          <SearchBox />
          <PoweredBy />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ padding: '0px 20px' }}>
            <h3>Product Type</h3>
            <Menu attribute='type' />

            <h3>Product Type Refinements</h3>
            <p>
              1. Select 'Connectivity' or 'Wireless speakers'. (I've only
              implemented the example for those.)
              <br />
              2.
              <u>
                Pretend the refinements below are attributes unique to that
                product type
              </u>
              <br />
              and we want to show further refinements for the given type of
              product.
              <br />
              <u>For example:</u>
              <br />
              <b>Car</b>: carDoors(2/4), horsepower...
              <br />
              <b>Bicycle</b>: bikeType (mountain/hybrid/road), bikeFrame
              (aluminum/carbon/steel)...
            </p>

            <ProductTypeRefinements
              productType={searchState.menu && searchState.menu.type}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <ClearRefinements />
            </div>
            <div>
              <Hits />
            </div>
            <div style={{ alignSelf: 'center' }}>
              <Pagination showLast={true} />
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}

export default App;
