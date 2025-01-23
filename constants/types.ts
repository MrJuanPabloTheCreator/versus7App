interface TeamDetails {
    team_id: string
    picture: string;
    name: string;
}

interface UserDetails {
    username: string;
}

interface MatchPreviewDetails {
    team_1_info: TeamDetails;
    team_2_info: TeamDetails;
    date_time: string;
    address_coordinates: string;
}

interface Post {
    post_id: string;
    type: 'L4 player' | 'L4 rival team'
    entity_type: 'user' | 'team';
    entity_id: null | string;
    entity_details: UserDetails | TeamDetails;
    content_text: string;
    association_type: null | 'team' | 'match';
    association_id: null | string;
    association_details: null | TeamDetails | MatchPreviewDetails;
    timestamp: string;
    date_time?: string;
    address_coordinates?: string;
}

interface Facility {
    facility_id: string;
    name: string;
    pictures: string[];
    address: string;
    coordinates: string;
}

interface UserFollowingTimelines {
    username: string;
    feed: [];
}

interface UserSuggestedTimelines {
    username: string;
    feed: [];
}