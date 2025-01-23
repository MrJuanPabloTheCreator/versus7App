import { ViewProps } from "react-native";

export interface AccordionProps extends ViewProps {
    contentBackgroundColor?: string;
    header: React.JSX.Element;
    contentHeight?: number;
}