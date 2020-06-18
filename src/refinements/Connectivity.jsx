import React from 'react';
import { RefinementList, MenuSelect } from 'react-instantsearch-dom';

const Connectivity = (props) => (
  <>
    <h3>Connectivity refinements</h3>

    <h3>Price range</h3>
    <RefinementList attribute='price_range' />

    <h3>Free shipping</h3>
    <MenuSelect attribute='free_shipping' />
  </>
);

export default React.memo(Connectivity);
