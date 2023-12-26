import React, { useState, useEffect, Fragment } from 'react';
import { StayPreview } from './StayPreview';
import { NoMatches } from './NoMatches';
import { useSelector } from 'react-redux';
import { Loader } from './Loader';

export function StayList({ stays }) {
  const [visibleStays, setVisibleStays] = useState([]);
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
  const itemsPerPage = 20;

  useEffect(() => {
    if (visibleStays.length === 0) {
      loadMoreStays();
    }
  }, [stays]);

  const loadMoreStays = () => {
    const currentVisibleStaysCount = visibleStays.length;
    const nextVisibleStays = stays.slice(
      currentVisibleStaysCount,
      currentVisibleStaysCount + itemsPerPage
    );

    setVisibleStays([...visibleStays, ...nextVisibleStays]);
  };

  if (isLoading) return <Loader />
  return (
    <Fragment>

      {stays.length < 1 && <NoMatches />}
      <ul className='stays-list clean-list'>
        {stays.map((stay) => (
          <li className='stay' key={stay._id}>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
