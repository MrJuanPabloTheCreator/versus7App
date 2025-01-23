export type UserInfo = {
  sub: string;
  username: string;
  picture: string;
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