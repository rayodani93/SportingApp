import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { supabase } from '../../config/supabaseClient';
import { colors, commonStyles } from '../../types/theme';
import TopBar from './components/TopBar';
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
  const [userEmail, setUserEmail] = useState<string | null>(null); // Estado para almacenar el correo del usuario

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

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUserEmail(data?.user?.email || null);
  };

  useEffect(() => {
    fetchNews();
    getUser();
  }, []);

  const renderItem = ({ item }: { item: News }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', { id: item.id })}
    >
      <Image source={{ uri: item.imagen }} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.titulo}</Text>
    </TouchableOpacity>
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
      <TopBar title="Noticias" />

      {userEmail === 'rayodani93@gmail.com' && (
        <Button
          title="Añadir Noticia"
          onPress={() => navigation.navigate('AddNoticia')}
          color={colors.primary}
        />
      )}

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
  },
  listContent: {
    paddingHorizontal: 10,
  },
  newsItem: {
    marginBottom: 20,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default NoticiasScreen;
