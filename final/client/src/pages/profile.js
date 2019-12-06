import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';
import ProfileImageUploader from '../components/profile-image-uploader';

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      # profileImage
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function Profile() {
  const { data, loading, error } = useQuery(
    GET_MY_TRIPS,
    { fetchPolicy: "network-only" }
  );
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  if (!data.me) {
    return <p>You are not logged in</p>;
  }

  return (
    <Fragment>
      <Header image={data.me.profileImage}>My Trips</Header>
      {/* <ProfileImageUploader /> */}
      {data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </Fragment>
  );
}
