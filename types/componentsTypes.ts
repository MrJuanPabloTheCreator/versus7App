import { ViewProps } from "react-native";

export interface AccordionProps extends ViewProps {
    fitContent?: boolean
    contentBackgroundColor?: string;
    header: React.JSX.Element;
    contentHeight?: number;
}