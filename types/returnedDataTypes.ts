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