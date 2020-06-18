Based on
<https://github.com/algolia/react-instantsearch/tree/master/examples/react-router>.

Shows 2 issue when using a product type selector that removes DOM elements:

1. `onSearchStateChange()` is called once for every item removed from
   DOM--causes duplicate history issues requiring hack fix,
2. 2x HTTP requests to Algolia (b/c invokes both `onExternalState()` &
   `onWidgetsUpdate()`). The first request is useless because it does not have
   correct refinements for the new DOM items. Ideally, would like to disable
   that request somehow (possibly via passing `false` to `refine()` within a
   custom menu component used in ProductType.jsx).

## Start the example

```sh
yarn install
yarn start
```
