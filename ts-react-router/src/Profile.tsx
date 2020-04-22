import React from 'react';
import { RouteComponentProps } from 'react-router';

type Data = {
  [key: string]: {
    name: string;
    description: string;
  };
};

const data: Data = {
  messi: {
    name: '메시',
    description: '축구의 신',
  },
  ronaldo: {
    name: '호날두',
    description: '노쇼의 신',
  },
};

type ProfileParams = {
  username: string;
};

export default function Profile({ match }: RouteComponentProps<ProfileParams>) {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
}
