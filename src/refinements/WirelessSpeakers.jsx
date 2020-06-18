import React from 'react';
import { RatingMenu } from 'react-instantsearch-dom';

const WirelessSpeakers = (props) => (
  <>
    <h3>WirelessSpeakers refinements</h3>

    <h3>Rating</h3>
    <RatingMenu attribute='rating' />
  </>
);

export default React.memo(WirelessSpeakers);
