import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../../config/supabaseClient';
import { colors, commonStyles } from '../../types/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NoticiasScreenNavigationProp } from '../../types/navigation'; 

type Props = {
  navigation: NoticiasScreenNavigationProp;
};

type News = {
  id: number;
  titulo: string;
  imagen: string;
  contenido: string;
  creado_en: string;
};

const NoticiasScreen: React.FC<Props> = ({ navigation }) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('creado_en', { ascending: false });
      if (error) throw new Error(error.message);
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderItem = ({ item }: { item: News }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.imagen }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.titulo}</Text>
        <Text style={styles.newsDescription}>{item.contenido.substring(0, 100)}...</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias</Text>
      
      {/* Botón Añadir Noticia */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNoticia')}
      >
        <Icon name="plus" size={20} color={colors.white} />
        <Text style={styles.addButtonText}>Añadir Noticia</Text>
      </TouchableOpacity>

      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  newsItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  newsDescription: {
    fontSize: 14,
    color: colors.secondary,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NoticiasScreen;
