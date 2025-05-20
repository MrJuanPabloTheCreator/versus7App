interface TeamDetails {
    team_id: string;
    name: string;
    image: string;
}

interface UserDetails {
    username: string;
}

type AppEvent =
  | { eventType: 'match'; details: MatchPreviewDetails }
  | { eventType: 'post'; details: Post };

interface MatchPreviewDetails {
    match_id: string
    team_1: TeamDetails;
    team_2: TeamDetails;
    date_time: string;
    location: string;
    address_coordinates: string;
}

interface Post {
    post_id: string;
    type?: 'L4 player' | 'L4 rival team'
    sub: number;
    username: string;
    title: string;
    description: string;
    picture: string;
    entity_type?: 'user' | 'team';
    entity_id?: null | string;
    entity_details?: UserDetails | TeamDetails;
    content_text?: string;
    association_type?: null | 'team' | 'match';
    association_id?: null | string;
    association_details?: null | TeamDetails | MatchPreviewDetails;
    timestamp: string;
    date_time?: string;
    address_coordinates?: string;
}

interface Facility {
    facility_id: string;
    name: string;
    pictures: string[];
    address: string;
    price?: number;
    coordinates: {
        x: number;
        y: number;
    };
}

interface Tournament {
    tournament_id: string;
    name: string;
    pictures: string[];
    facility_name: string;
    address: string;
    playersPerSide: number;
    price: number;
    coordinates: {
        x: number;
        y: number;
    };
}

interface UserFollowingTimelines {
    username: string;
    feed: [];
}

interface UserSuggestedTimelines {
    username: string;
    feed: [];
}