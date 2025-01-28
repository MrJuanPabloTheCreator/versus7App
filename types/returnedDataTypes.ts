export type UserInfo = {
  sub: string;
  username: string;
  picture: string;
}

export type FriendInfo = {
  sub: string;
  username: string;
  picture: string;
  status: 'sent' | 'pending' | 'friends';
}

export type Place = {
  id: string;
  displayName: {
    languageCode: string;
    text: string;
  };
  shortFormattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
};