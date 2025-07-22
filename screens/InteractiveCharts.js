import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const InteractiveChart = ({ data }) => {
  const html = `
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/recharts/umd/Recharts.min.js"></script>
      <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #root { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } = Recharts;

        const data = ${JSON.stringify(data)};

        const App = () => (
          React.createElement(LineChart, {
            width: 350, height: 300, data,
            margin: { top: 5, right: 20, bottom: 5, left: 0 }
          },
            React.createElement(Line, { type: "monotone", dataKey: "count", stroke: "#2196F3" }),
            React.createElement(CartesianGrid, { stroke: "#ccc", strokeDasharray: "5 5" }),
            React.createElement(XAxis, { dataKey: "day" }),
            React.createElement(YAxis, null),
            React.createElement(Tooltip, null)
          )
        );

        ReactDOM.render(React.createElement(App), document.getElementById('root'));
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ height: 300 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" />}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default InteractiveChart;
