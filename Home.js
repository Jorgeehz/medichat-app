import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Button, ScrollView, Image, Touchable } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('./assets/LogoPsico.jpg')} style={styles.logoContainer} />
            <Text style={styles.title}>Bienvenido a PsicoChat</Text>
            <Text style={styles.description}>
                PsicoChat es una aplicación diseñada para ayudarte a cuidar tu bienestar emocional. A través de nuestro chatbot, recibirás apoyo en cualquier momento que lo necesites.
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.textstyle}>Comenzar</Text>
            </TouchableOpacity>

            <Text style={styles.benefitsTitle}>Beneficios:</Text>

            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Chatbot Interactivo</Text>
                    <Text style={styles.cardDescription}>
                        Un asistente inteligente que te acompaña en momentos de crisis, con el que puedes interactuar de manera rápida y segura.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Guía de Autoayuda</Text>
                    <Text style={styles.cardDescription}>
                        Recibe herramientas de autoayuda y consejos prácticos para gestioanr el estrés, la ansiedad y la depresión, verificados por profesionales de la salud.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Privacidad y Seguridad</Text>
                    <Text style={styles.cardDescription}>
                        Tus conversaciones y datos están completamente encriptados, garantizando la confidencialidad de tu información y tu tranquilidad.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Acceso Inmediato</Text>
                    <Text style={styles.cardDescription}>
                        Accede a información y recursos de salud mental avalados por profesionales, sin necesidad de ir a un especialista.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Comunidad de Apoyo</Text>
                    <Text style={styles.cardDescription}>
                        Conéctate con otros usuarios de la plataforma que comparten experiencias similares, creando un espacio de apoyo y empatía.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Soporte Multiplataforma</Text>
                    <Text style={styles.cardDescription}>
                        Accede a PsicoChat desde tu teléfono móvil, tablet o computadora, permitiéndote mantener contacto sin importar dónde te encuentres.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    logoContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 9999,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        marginBottom: 20,
    },
    startButton: {
        marginVertical: 20,
        backgroundColor: '#b4e3d8',
        borderRadius: 10,
        padding: 10,
    },
    textstyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    benefitsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: '44%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'medium',
        textAlign: 'center',
    },
});

export default Home;
