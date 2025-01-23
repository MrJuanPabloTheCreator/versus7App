import React, { useEffect, useState } from 'react'
import YStack from './ystack'
import Input from './input'
import { Place } from 'types/returnedDataTypes';

interface LocationSearchProps {
    callbackFunction: (places: Place[], textInputValue: string) => void;
}

const LocationSearch:React.FC<LocationSearchProps> = ({ callbackFunction }) => {
    const [text, setText] = useState('')
    const [debouncedText, setDebouncedText] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedText(text);
        }, 500);
    
        return () => {
          clearTimeout(handler);
        };
    }, [text]);
    
    useEffect(() => {
        if (debouncedText === '') {
            callbackFunction([], '');
        } else {
            const makeRequest = async () => {
                try {     
                    const requestResult = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Goog-Api-Key': 'AIzaSyDrMseunnRkOyTEjRH9zfxRzk4uBpcIQ38',
                            'X-Goog-FieldMask': 'places.id,places.displayName,places.shortFormattedAddress,places.location'
                        }, 
                        body: JSON.stringify({
                            textQuery: text,
                            regionCode: 'CL',
                            locationRestriction: {
                            rectangle: {
                                low: {
                                latitude: -55.0,
                                longitude: -75.0,
                                },
                                high: {
                                latitude: -17.0,
                                longitude: -66.0,
                                },
                            },
                            },
                        })
                    })
                    const { places } = await requestResult.json();
                    if (places) {
                        callbackFunction(places, text);
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };

            makeRequest();
        }
    }, [debouncedText]);

    return (
        <Input placeholder='Search place...' value={text} onChangeText={(text) => setText(text)}/>
    )
}

export default LocationSearch