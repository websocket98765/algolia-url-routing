Based on
<https://github.com/algolia/react-instantsearch/tree/master/examples/react-router>.

Shows issue when using a product type selector that removes DOM elements:
onSearchStateChange() is called once for every item removed--causes duplicate
history issues requiring hack fix, 2x HTTP requests (b/c invokes both
`onExternalState()` & `onWidgetsUpdate()`)

## Start the example

```sh
yarn install
yarn start
```
