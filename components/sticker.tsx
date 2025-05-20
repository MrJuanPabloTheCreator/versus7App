import React from 'react'
import { XStack, Text } from 'components'

type StickerType = 'green' | 'blue' | 'red' | 'yellow' | 'gray' | 'purple';

const Sticker = ({ text, type='green' }: { text: string, type?: StickerType }) => {
    const getColors = () => {
        switch (type) {
            case 'purple':
                return {
                    color: '#B28DFF',
                    backgroundColor: '#2E1A4F',
                    borderColor: '#B28DFF',
                };
            case 'green':
                return {
                color: '#6DF700',
                backgroundColor: '#074400',
                borderColor: '#6DF700',
                };
            case 'blue':
                return {
                color: '#00C2FF',
                backgroundColor: '#002F45',
                borderColor: '#00C2FF',
                };
            case 'red':
                return {
                color: '#FF6B6B',
                backgroundColor: '#3D0000',
                borderColor: '#FF6B6B',
                };
            case 'yellow':
                return {
                color: '#FFD600',
                backgroundColor: '#3B3700',
                borderColor: '#FFD600',
                };
            case 'gray':
                return {
                color: '#CCCCCC',
                backgroundColor: '#2A2A2A',
                borderColor: '#CCCCCC',
                };
            default:
                return {};
        }
    };
    
    const colors = getColors();

    return (
        <Text
            style={{ ...colors, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 24, fontSize: 14 }}
        >
            {text}
        </Text>
    )
}

export default Sticker