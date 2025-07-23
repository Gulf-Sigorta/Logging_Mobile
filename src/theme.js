import { DefaultTheme } from 'react-native-paper';

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#111372ff',
        accent: '#f1c40f',
        background: '#f0f0f0',
        surface: '#fff',
        text: '#333',
    },
};

export default myTheme;
