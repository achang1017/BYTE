import { Text, View, ScrollView, Switch, StyleSheet } from 'react-native';

import { auth } from '../../firebase';
import { useRouter } from 'expo-router';

export default function PreferenceScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Preference Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Preference</Text>
            </View>
            {/* Preference Options */}
            <View style={styles.sections}>
                {/* Service */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Enable features to help you reschedule.</Text>
                    <View style={styles.sectionContentStart}>
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionSubtitle}>Automatic Calendar Update</Text>
                            <Text style={styles.sectionDesc}>To automatically update new schedule on your calendar</Text>
                        </View>
                        <Switch style={styles.toggle}></Switch>
                    </View>
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionSubtitle}>AI Generated Flight Recommendation</Text>
                            <Text style={styles.sectionDesc}>To provide a list of alternative flights within your preference</Text>
                        </View>
                        <Switch style={styles.toggle}></Switch>
                    </View>
                    <View style={styles.sectionContentLast}>
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionSubtitle}>Personal Data Sync.</Text>
                            <Text style={styles.sectionDesc}>To streamline reschedule process using personal data from your account</Text>
                        </View>
                        <Switch style={styles.toggle}></Switch>
                    </View>
                </View>

                {/* Alternative Flight Priority */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Alternative Flgiht Priority</Text>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Price</Text>
                        <View style={styles.tooltip}></View>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Duration</Text>
                        <View style={styles.tooltip}></View>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Business Schedule</Text>
                        <View style={styles.tooltip}></View>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Flight Class</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Seat</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContentLast}>
                        <Text style={styles.sectionSubtitle}>Airline</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                </View>

                {/* Personal Data */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Data</Text>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Legal Name</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Date of Birth</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Business ID</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Passport ID</Text>
                        <View style={styles.checkbox}></View>
                    </View>
                    <View style={styles.sectionContentLast}>
                        <Text style={styles.sectionSubtitle}>Flight Schedule</Text>
                        <View style={styles.checkboxDefault}></View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    // Body
    sections: {
        alignItems: 'center',
        marginBottom: 25,
    },
    section: {
        width: 343,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 15,
        paddingBottom: 10,
    },
    sectionContentStart: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#BFCAE1',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    sectionContent: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    sectionText: {
        flex: 5,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#000',
        padding: 10,
        paddingLeft: 15,
    },
    sectionDesc: {
        fontSize: 11,
        color: '#676767',
        paddingBottom: 10,
        paddingLeft: 15,
    },
    sectionContentLast: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    toggle: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 10,
        paddingRight: 15,
    },
    checkbox: {

    },
    tooltip: {

    },
    checkboxDefault: {

    }
});
