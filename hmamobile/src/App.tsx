import React from 'react';
import { View, Text, Button } from 'react-native';
import { compareFaces } from './FaceCompare';

export default function App() {
  const [res, setRes] = React.useState<any>(null);

  async function runCompare() {
    const b64A = '';
    const b64B = '';

    const result = await compareFaces(b64A, b64B);
    setRes(result);
  }

  return (
    <View style={{ padding: 20 }}>
      <Button title="Compare Static Images" onPress={runCompare} />
      {res && (
        <Text>
          Similarity: {res.similarity.toFixed(4)}
          {'\n'}
          L2 Distance: {res.distance.toFixed(4)}
          {'\n'}
          Matched: {String(res.matched)}
        </Text>
      )}
    </View>
  );
}
