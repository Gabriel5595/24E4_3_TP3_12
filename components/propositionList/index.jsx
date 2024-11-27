import { useState, useEffect } from 'react';
import { FlatList, Text, ActivityIndicator, View, StyleSheet } from 'react-native';

const PropositionsList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPropositions = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://dadosabertos.camara.leg.br/api/v2/proposicoes?pagina=${page}&itens=10`
      );
      const json = await response.json();
      setData((prevData) => [...prevData, ...json.dados]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Erro ao buscar proposições:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropositions();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loading} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.ementa || 'Sem título'}</Text>
          <Text style={styles.subtitle}>ID: {item.id}</Text>
        </View>
      )}
      onEndReached={fetchPropositions}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  loading: {
    marginVertical: 16,
  },
});

export default PropositionsList;
