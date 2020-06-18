import React from 'react';
import Connectivity from './refinements/Connectivity';
import WirelessSpeakers from './refinements/WirelessSpeakers';

const ProductTypeRefinements = ({ productType }) => {
  if (productType === 'Connectivity') {
    return <Connectivity />;
  } else if (productType === 'Wireless speakers') {
    return <WirelessSpeakers />;
  }

  return <p>{productType + ' refinements go here'}</p>;
};

export default ProductTypeRefinements;
