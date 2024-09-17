import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { useSupabaseAuth } from '../../config/useSupabaseAuth';
import TopBar from './components/TopBar';
import { DashboardScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme';

type Props = {
    navigation: DashboardScreenNavigationProp;
};

const Dashboard: React.FC<Props> = ({ navigation }) => {
    const { user, loading } = useSupabaseAuth();

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    if (!user || (user.email !== 'rayodani93@gmail.com' && user.email !== 'encinasalex94@gmail.com')) {
        return <Text>No tienes acceso a esta página.</Text>;
    }

    return (
        <ImageBackground
            source={require('../../assets/EncisYo1.jpeg')}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <TopBar title="Dashboard" />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SubirFotos')}>
                        <Text style={styles.buttonText}>Subir Fotos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddNoticia')}>
                        <Text style={styles.buttonText}>Añadir Noticia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Convocatoria')}>
                        <Text style={styles.buttonText}>Añadir Convocatoria</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        width: 200,        // Ancho fijo
        height: 50,        // Alto fijo
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center', // Centra el texto verticalmente
        alignItems: 'center',    // Centra el texto horizontalmente
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Dashboard;
