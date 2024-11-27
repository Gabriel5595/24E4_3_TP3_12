import { SafeAreaView, StyleSheet } from 'react-native';
import PropositionsList from './components/propositionList/index.jsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PropositionsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
