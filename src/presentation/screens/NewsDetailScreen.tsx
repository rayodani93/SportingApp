import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { supabase } from '../../config/supabaseClient';
import { colors, commonStyles } from '../../types/theme';
import TopBar from './components/TopBar';
import { RootStackParamList } from '../../types/navigation';

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

type Props = {
  route: NewsDetailScreenRouteProp;
};

type News = {
  id: number;
  titulo: string;
  imagen: string;
  contenido: string;
  creado_en: string;
};

const NewsDetailScreen: React.FC<Props> = ({ route }) => {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewsDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', route.params.id)
        .single();
      if (error) throw new Error(error.message);
      setNews(data);
    } catch (error) {
      console.error("Error fetching news detail: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetail();
  }, []);

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!news) {
    return (
      <View style={commonStyles.container}>
        <Text>No se pudo cargar la noticia.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra superior con el título y los iconos */}
      <TopBar title="Noticia" />

      <Image source={{ uri: news.imagen }} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{news.titulo}</Text>
      <Text style={styles.newsContent}>{news.contenido}</Text>
      <Text style={styles.newsDate}>Publicado el: {new Date(news.creado_en).toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  newsImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  newsContent: {
    fontSize: 16,
    color: colors.secondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  newsDate: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'right',
  },
});

export default NewsDetailScreen;
