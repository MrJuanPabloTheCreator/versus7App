export const facilities: Facility[] = [
    {
        facility_id: '11',
        name: 'Ciudad Deportiva Iván Zamorano',
        pictures: [
            'https://lh3.googleusercontent.com/p/AF1QipOi71ipWEgUjS5LSymYOOl5eErCQZmquy6j-1Rq=s1360-w1360-h1020'
        ],
        address: 'Av. Padre Hurtado 2650, Las Condes, Santiago, Chile',
        coordinates: {
            x: -33.4286099945508,
            y: -70.53722122333065
        }
    },
    {
        facility_id: '12',
        name: 'Club Cordillera',
        pictures: [
            'https://lh5.googleusercontent.com/p/AF1QipOENHp3G15d5TTvnqPGwlt7ObImJsnvR7PJuXiH=w408-h246-k-no'
        ],
        address: 'Av. Departamental 3837, La Florida, Santiago, Chile',
        coordinates: {
            x: -33.512992297183246,
            y: -70.55720158738552
        }
    },
    {
        facility_id: '1',
        name: 'Soccer Field 1',
        pictures: [
            'https://i0.wp.com/traceup.com/wp-content/uploads/2023/05/shutterstock_1068727478-e1685120725622.jpg?fit=1000%2C525&ssl=1',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULg1UIZ1Mzj3Wd6NRBUFS0a55o7MBnDlZ8w&s'
        ],
        address: '123 Main St, City, Country',
        coordinates: {
            x: 40.712776,
            y: -74.005974
        }
    },
    {
        facility_id: '2',
        name: 'Soccer Field 2',
        pictures: [
            'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/saltlake/Screenshot-2023-08-30-161203_D559349E-F29C-D8A3-2587D09079BFA4B1-d5593374afe0d8e_d559367b-b32d-2148-503947b3230b7b8a.png',
            'https://www.aturf.com/wp-content/uploads/2021/11/sahlens-flash-field-corner-kick-sunset-940x410.jpg'
        ],
        address: '456 Elm St, City, Country',
        coordinates: {
            x: 34.052235,
            y: -118.243683
        }
    },
    {
        facility_id: '3',
        name: 'Soccer Field 3',
        pictures: [
            'https://luthernorse.com/images/2021/12/3/Soccer_Pitch_III.jpg',
            'https://sportsgrass.com/wp-content/uploads/2018/12/1Q5Z8fGg.jpeg'
        ],
        address: '789 Oak St, City, Country',
        coordinates: {
            x: 51.507351,
            y: -0.127758
        }
    },
    {
        facility_id: '4',
        name: 'Soccer Field 4',
        pictures: [
            'https://d2jqoimos5um40.cloudfront.net/site_1525/1e1bd6.jpeg',
            'https://asburyeagles.com/images/2023/5/5/IMG_7210.JPG'
        ],
        address: '101 Pine St, City, Country',
        coordinates: {
            x: 48.856613,
            y: 2.352222
        }
    },
    {
        facility_id: '5',
        name: 'Soccer Field 5',
        pictures: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikrtK6fICvbXhR9uAy-s9F7Q3zJtyHJ_0jg&s',
            'https://example.com/soccer_field5_pic2.jpg'
        ],
        address: '202 Maple St, City, Country',
        coordinates: {
            x: 35.689487,
            y: 139.691711
        }
    },
    {
        facility_id: '6',
        name: 'Soccer Field 6',
        pictures: [
            'https://ungathletics.com/images/2023/3/28/IMG_8243_F57vK.jpgg',
            'https://example.com/soccer_field6_pic2.jpg'
        ],
        address: '303 Birch St, City, Country',
        coordinates: {
            x: 55.755825,
            y: 37.617298
        }
    },
    {
        facility_id: '7',
        name: 'Soccer Field 7',
        pictures: [
            'https://www.westchesterfamily.com/wp-content/uploads/2024/07/pexels-mike-468229-1171084-822x616.jpg',
            'https://example.com/soccer_field7_pic2.jpg'
        ],
        address: '404 Cedar St, City, Country',
        coordinates: {
            x: 40.416775,
            y: -3.703790
        }
    },
    {
        facility_id: '8',
        name: 'Soccer Field 8',
        pictures: [
            'https://example.com/soccer_field8_pic1.jpg',
            'https://example.com/soccer_field8_pic2.jpg'
        ],
        address: '505 Walnut St, City, Country',
        coordinates: {
            x: 52.520008,
            y: 13.404954
        }
    },
    {
        facility_id: '9',
        name: 'Soccer Field 9',
        pictures: [
            'https://example.com/soccer_field9_pic1.jpg',
            'https://example.com/soccer_field9_pic2.jpg'
        ],
        address: '606 Chestnut St, City, Country',
        coordinates: {
            x: 41.902782,
            y: 12.496366
        }
    },
    {
        facility_id: '10',
        name: 'Soccer Field 10',
        pictures: [
            'https://example.com/soccer_field10_pic1.jpg',
            'https://example.com/soccer_field10_pic2.jpg'
        ],
        address: '707 Spruce St, City, Country',
        coordinates: {
            x: 37.774929,
            y: -122.419418
        }
    }
];

export const tournaments: Tournament[] = [
    {
        tournament_id: '11',
        name: 'Miami Championship',
        facility_name: 'Ciudad Deportiva Iván Zamorano',
        price: 100,
        playersPerSide: 7,
        pictures: [
            'assets/tournament1.png',
        ],
        address: 'Av. Padre Hurtado 2650, Las Condes, Santiago, Chile',
        coordinates: {
            x: -33.4286099945508,
            y: -70.53722122333065
        }
    }
]

export const notes = [
    {
        post_id: `post_1`,
        sub: 1,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Juan_1`,
        picture: `https://randomuser.me/api/portraits/men/1.jpg`,
        address: 'Av. Padre Hurtado 2650, Las Condes, Santiago, Chile',
        date_time: ''
    },
    {
        post_id: `post_2`,
        sub: 2,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Pedro_2`,
        picture: `https://randomuser.me/api/portraits/men/2.jpg`,
    },
    {
        post_id: `post_3`,
        sub: 3,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Diego_3`,
        picture: `https://randomuser.me/api/portraits/men/3.jpg`,
    },
    {
        post_id: `post_4`,
        sub: 4,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Martin_4`,
        picture: `https://randomuser.me/api/portraits/men/4.jpg`,
    },
    {
        post_id: `post_5`,
        sub: 5,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Mateo_5`,
        picture: `https://randomuser.me/api/portraits/men/5.jpg`,
    },
    {
        post_id: `post_6`,
        sub: 6,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Lucas_6`,
        picture: `https://randomuser.me/api/portraits/men/6.jpg`,
    },
    {
        post_id: `post_7`,
        sub: 7,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Matias_7`,
        picture: `https://randomuser.me/api/portraits/men/7.jpg`,
    },
    {
        post_id: `post_8`,
        sub: 8,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Sebastian_8`,
        picture: `https://randomuser.me/api/portraits/men/8.jpg`,
    },
    {
        post_id: `post_9`,
        sub: 9,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Gabriel_9`,
        picture: `https://randomuser.me/api/portraits/men/9.jpg`,
    },
    {
        post_id: `post_10`,
        sub: 10,
        title: 'Buscando Jugador',
        description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
        timestamp: '2024-11-08T02:47:59.000Z',
        username: `Nicolas_10`,
        picture: `https://randomuser.me/api/portraits/men/10.jpg`,
    },
];

export const events: AppEvent[] = [
    {
        eventType: 'match',
        details: {
            match_id: '1',
            team_1: {
              team_id: 'team_1',
              name: 'Barcelona',
              image: require('assets/barcelona.png'),
            },
            team_2: {
              team_id: 'team_2',
              name: 'PSG',
              image: require('assets/PSG.png'),
            },
            date_time: '2025-4-24T14:00:00Z',
            location: 'Estadio Nacional',
            address_coordinates: '-33.45694,-70.64827',
        },
    },
    {
        eventType: 'match',
        details: {
            match_id: '2',
            team_1: {
              team_id: 'team_3',
              name: 'Los Leones',
              image: '',
            },
            team_2: {
              team_id: 'team_4',
              name: 'Las Águilas',
              image: '',
            },
            date_time: '2025-4-25T14:00:00Z',
            location: 'Estadio Monumental',
            address_coordinates: '-33.46912,-70.64177',
        },
    },
    {
        eventType: 'match',
        details: {
            match_id: '3',
            team_1: {
              team_id: 'team_5',
              name: 'Los Dragones',
              image: '',
            },
            team_2: {
              team_id: 'team_6',
              name: 'Los Lobos',
              image: '',
            },
            date_time: '2024-11-10T18:00:00Z',
            location: 'Estadio Bicentenario',
            address_coordinates: '-33.50000,-70.60000',
        },
    },
    // {
    //     eventType: 'post',
    //     details: {
    //         post_id: `post_9`,
    //         sub: 9,
    //         title: 'Buscando Jugador',
    //         description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
    //         timestamp: '2024-11-08T02:47:59.000Z',
    //         username: `Gabriel_9`,
    //         picture: `https://randomuser.me/api/portraits/men/9.jpg`,
    //     },
    // }
]


export const fakeSchedules = [ '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
'22:00', '23:00', '00:00', '01:00', '02:00', '03:00']