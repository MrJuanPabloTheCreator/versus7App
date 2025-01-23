import React, { ReactElement, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

import { XStack, YStack, AnimatedView, AnimatedButton } from 'components';
import useTheme from 'contexts/ThemeContext/useTheme';
import { AccordionProps } from 'types/componentsTypes';
import { TouchableOpacity } from 'react-native';

const Accordion:React.FC<AccordionProps> = ({ children, header, style, contentBackgroundColor, contentHeight=200 }) => {
    const [viewOpen, setViewOpen] = useState(false)
    const { themeConstants } = useTheme();

    return (
        <YStack style={{ borderRadius: 12, overflow: 'hidden' }}>
            <TouchableOpacity onPress={() => setViewOpen(!viewOpen)}>
                <XStack style={[{ backgroundColor: themeConstants.colors.secondary, justifyContent: 'space-between', padding: 16 }, style]}>
                    {header}
                    <AnimatedButton rotate={viewOpen}>
                        <AntDesign name="down" size={20} color={themeConstants.colors.text} />
                    </AnimatedButton>
                </XStack>
            </TouchableOpacity>
            <AnimatedView open={viewOpen} style={{ overflow: 'hidden', backgroundColor: contentBackgroundColor || themeConstants.view.backgroundColor }} heightVariation={[0, contentHeight]}>
                {children}
            </AnimatedView>
        </YStack>
    )
}

export default Accordion