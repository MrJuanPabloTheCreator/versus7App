import { View as RNView, StyleSheet, ViewProps } from 'react-native';

import useTheme from 'contexts/ThemeContext/useTheme';

const View: React.FC<ViewProps> = ({ children, style, ...props }) => {

  return (
    <RNView
      style={[
        styles.defaultView, 
        // { backgroundColor: themeConstants.view.backgroundColor }, 
        style
      ]}
      {...props}
    >
      {children}
    </RNView>
  );
};

export default View;

const styles = StyleSheet.create({
  defaultView: {
    flex: 1
  },
});
