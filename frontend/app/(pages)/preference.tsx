import { Image, Text, View, ScrollView, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase';
import Checkbox from 'expo-checkbox';
import { useUserPreferences } from '../../context/userPreferencesContext'; // Import the hook

export default function PreferenceScreen() {

    const db = getFirestore();
    const user = auth.currentUser;
    const userEmail = user?.email || "";
    const preferenceRef = doc(db, 'users', userEmail);

    const { preferences } = useUserPreferences();

    const [isAutoCalendar, setIsAutoCalendar] = useState(preferences.preferences.autoCalendarUpdate);
    const [isAiFlightRec, setIsAiFlightRec] = useState(preferences.preferences.aiFlightRecommendation);
    const [isDataSync, setIsDataSync] = useState(preferences.preferences.personalDataSync);
    const [isPrice, setIsPrice] = useState(preferences.preferences.isWithinBudget);
    const [isDuration, setIsDuration] = useState(preferences.preferences.isDurationPriority);
    const [isBusinessSchedule, setIsBusinessSchedule] = useState(preferences.preferences.isBusinessPriority);
    const [isFlightClass, setIsFlightClass] = useState(preferences.preferences.isClassPriority);
    const [isSeat, setIsSeat] = useState(preferences.preferences.isSeatPriority);
    const [isLayover, setIsLayover] = useState(preferences.preferences.isLayover);
    const [isStopover, setIsStopover] = useState(preferences.preferences.isStopover);
    const flightClass: String = preferences.preferences.preferredClass;
    const seat: String = preferences.preferences.preferredSeat;
    const [hasLegalName, setHasLegalName] = useState(preferences.preferences.hasLegalName);
    const [hasBirthDate, setHasBirthDate] = useState(preferences.preferences.hasBirthDate);
    const [hasBusinessID, setHasBusinessID] = useState(preferences.preferences.setHasBusinessID);
    const [hasPassportID, setHasPassportID] = useState(preferences.preferences.hasPassportID);

    const [isEconomy, setIsEconomy] = useState(flightClass === 'Economy');
    const [isBusiness, setIsBusiness] = useState(flightClass === 'Business');
    const [isFirst, setIsFirst] = useState(flightClass === 'First');
    const [isAisle, setIsAisle] = useState(seat === 'Aisle');
    const [isWindow, setIsWindow] = useState(seat === 'Window');

    const [showTipPrice, setTipPrice] = useState(false);
    const [showTipDuration, setTipDuration] = useState(false);
    const [showTipBusinessSchedule, setTipBusinessSchedule] = useState(false);

    const toggleAutoCalendar = async (value: boolean) => {
        setIsAutoCalendar(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.autoCalendarUpdate': value });
        } catch (e) {
        }
    };
    const toggleAiFlightRec = async (value: boolean) => {
        setIsAiFlightRec(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.aiFlightRecommendation': value });
        } catch (e) {
        }
    };
    const toggleDataSync = async (value: boolean) => {
        setIsDataSync(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.personalDataSync': value });
        } catch (e) {
        }
    };
    const checkPrice = async (value: boolean) => {
        setIsPrice(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.isWithinBudget': value });
        } catch (e) {
        }
    };
    const checkDuration = async (value: boolean) => {
        setIsDuration(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.isDurationPriority': value });
        } catch (e) {
        }
    };
    const checkBusiness = async (value: boolean) => {
        setIsBusinessSchedule(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.isBusinessPriority': value });
        } catch (e) {
        }
    };
    const checkFlightClass = async (value: boolean) => {
        setIsFlightClass(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.isClassPriority': value });
        } catch (e) {
        }
    };
    const checkSeat = async (value: boolean) => {
        setIsSeat(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.isSeatPriority': value });
        } catch (e) {
        }
    };
    const toggleIsLayover = async () => {
        const value = !isLayover;
        setIsLayover(value);
        if (isStopover) {
            setIsStopover(false);
            await updateDoc(preferenceRef, { 'preferences.isStopover': false });
        }
        try {
            await updateDoc(preferenceRef, { 'preferences.isLayover': value });
        } catch (e) {
        }
    }
    const toggleIsStopover = async () => {
        const value = !isStopover;
        setIsStopover(value);
        if (isLayover) {
            setIsLayover(false);
            await updateDoc(preferenceRef, { 'preferences.isLayover': false });
        }
        try {
            await updateDoc(preferenceRef, { 'preferences.isStopover': value });
        } catch (e) {
        }
    }
    const toggleEconomy = async () => {
        const value: String = 'Economy';
        setIsEconomy(!isEconomy);
        if (isFirst || isBusiness) {
            setIsBusiness(false);
            setIsFirst(false);
        }
        try {
            if (!isEconomy) {
                await updateDoc(preferenceRef, { 'preferences.preferredClass': value });
            } else {
                await updateDoc(preferenceRef, { 'preferences.preferredClass': '' });
            }
        } catch (e) {
        }
    }
    const toggleBusiness = async () => {
        const value: String = 'Business';
        setIsBusiness(!isBusiness);
        if (isEconomy || isFirst) {
            setIsEconomy(false);
            setIsFirst(false);
        }
        try {
            if (!isBusiness) {
                await updateDoc(preferenceRef, { 'preferences.preferredClass': value });
            } else {
                await updateDoc(preferenceRef, { 'preferences.preferredClass': '' });
            }
        } catch (e) {
            console.error("Error updating:", e);
        }
    }
    const toggleFirst = async () => {
        const value: String = 'First';
        setIsFirst(!isFirst);
        if (isEconomy || isBusiness) {
            setIsEconomy(false);
            setIsBusiness(false);
        }
        try {
            if (!isFirst) {
                await updateDoc(preferenceRef, { 'preferences.preferredClass': value });
            } else {
                await updateDoc(preferenceRef, { 'preferences.preferredClass': '' });
            }
        } catch (e) {
            console.error("Error updating:", e);
        }
    }
    const toggleAisle = async () => {
        const value: String = 'Aisle';
        setIsAisle(!isAisle);
        if (isWindow) {
            setIsWindow(false);
        }
        try {
            if (!isAisle) {
                await updateDoc(preferenceRef, { 'preferences.preferredSeat': value });
            } else {
                await updateDoc(preferenceRef, { 'preferences.preferredSeat': '' });
            }
        } catch (e) {
        }
    }
    const toggleWindow = async () => {
        const value: String = 'Window';
        setIsWindow(!isWindow);
        if (isAisle) {
            setIsAisle(false);
        }
        try {
            if (!isWindow) {
                await updateDoc(preferenceRef, { 'preferences.preferredSeat': value });
            } else {
                await updateDoc(preferenceRef, { 'preferences.preferredSeat': '' });
            }
        } catch (e) {
        }
    }
    const checkLegalName = async (value: Boolean) => {
        setHasLegalName(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.hasLegalName': value });
        } catch (e) {
        }
    }
    const checkBirthDate = async (value: Boolean) => {
        setHasBirthDate(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.hasBirthDate': value });
        } catch (e) {
        }
    }
    const checkBusinessID = async (value: Boolean) => {
        setHasBusinessID(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.hasBusinessID': value });
        } catch (e) {
        }
    }
    const checkPassportID = async (value: Boolean) => {
        setHasPassportID(value);
        try {
            await updateDoc(preferenceRef, { 'preferences.hasPassportID': value });
        } catch (e) {
        }
    }

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
                    <Text style={styles.sectionTitle}>Sevice</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionSubtitle}>Automatic Calendar Update</Text>
                            <Text style={styles.sectionDesc}>To automatically update new schedule on your calendar</Text>
                        </View>
                        <Switch
                            style={styles.toggle}
                            trackColor={{ false: '#fff', true: '#1F5FC1' }}
                            onValueChange={toggleAutoCalendar}
                            value={isAutoCalendar}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionSubtitle}>AI Generated Flight Recommendation</Text>
                            <Text style={styles.sectionDesc}>To provide a list of alternative flights within your preference</Text>
                        </View>
                        <Switch
                            style={styles.toggle}
                            trackColor={{ false: '#fff', true: '#1F5FC1' }}
                            onValueChange={toggleAiFlightRec}
                            value={isAiFlightRec}
                        />
                    </View>
                    <View style={[styles.sectionContent, styles.sectionContentLast]}>
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionSubtitle}>Personal Data Sync.</Text>
                            <Text style={styles.sectionDesc}>To streamline reschedule process using personal data from your account</Text>
                        </View>
                        <Switch
                            style={styles.toggle}
                            trackColor={{ false: '#fff', true: '#1F5FC1' }}
                            onValueChange={toggleDataSync}
                            value={isDataSync}
                        />
                    </View>
                </View>

                {/* Alternative Flight Priority */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Alternative Flgiht Priority</Text>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Price</Text>
                        <View style={styles.tooltipPosition}>
                            <Tooltip
                                isVisible={showTipPrice}
                                content={<Text>Within budget, no extra cost</Text>}
                                placement='right'
                                onClose={() => setTipPrice(false)}
                            >
                                <TouchableOpacity onPress={() => setTipPrice(true)}>
                                    <Image
                                        style={styles.tooltip}
                                        source={require('../../assets/images/tooltip.png')}
                                    />
                                </TouchableOpacity>
                            </Tooltip>
                        </View>
                        <Checkbox
                            style={styles.checkbox}
                            value={isPrice}
                            onValueChange={checkPrice}
                            color={isPrice ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Duration</Text>
                        <View style={styles.tooltipPosition}>
                            <Tooltip
                                isVisible={showTipDuration}
                                content={<Text>Total flight hours, # flight transfers, including waiting time</Text>}
                                placement='right'
                                onClose={() => setTipDuration(false)}
                            >
                                <TouchableOpacity onPress={() => setTipDuration(true)}>
                                    <Image
                                        style={styles.tooltip}
                                        source={require('../../assets/images/tooltip.png')}
                                    />
                                </TouchableOpacity>
                            </Tooltip>
                        </View>
                        <Checkbox
                            style={styles.checkbox}
                            value={isDuration}
                            onValueChange={checkDuration}
                            color={isDuration ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    {isDuration && (
                        <View style={styles.sectionContentDropdown}>
                            <TouchableOpacity
                                style={[styles.button, isLayover ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleIsLayover}
                            >
                                <Text style={isLayover ? styles.textClicked : styles.textUnclicked}>No Layover</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, isStopover ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleIsStopover}
                            >
                                <Text style={isStopover ? styles.textClicked : styles.textUnclicked}>No Stopover</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Business Schedule</Text>
                        <View style={styles.tooltipPosition}>
                            <Tooltip
                                isVisible={showTipBusinessSchedule}
                                content={<Text>Prioritize minimum meeting conflicts</Text>}
                                placement='right'
                                onClose={() => setTipBusinessSchedule(false)}
                            >
                                <TouchableOpacity onPress={() => setTipBusinessSchedule(true)}>
                                    <Image
                                        style={styles.tooltip}
                                        source={require('../../assets/images/tooltip.png')}
                                    />
                                </TouchableOpacity>
                            </Tooltip>
                        </View>
                        <Checkbox
                            style={styles.checkbox}
                            value={isBusinessSchedule}
                            onValueChange={checkBusiness}
                            color={isBusinessSchedule ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Flight Class</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={isFlightClass}
                            onValueChange={checkFlightClass}
                            color={isFlightClass ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    {isFlightClass && (
                        <View style={styles.sectionContentDropdown}>
                            <TouchableOpacity
                                style={[styles.button, isEconomy ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleEconomy}
                            >
                                <Text style={isEconomy ? styles.textClicked : styles.textUnclicked}>Economy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, isBusiness ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleBusiness}
                            >
                                <Text style={isBusiness ? styles.textClicked : styles.textUnclicked}>Business</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, isFirst ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleFirst}
                            >
                                <Text style={isFirst ? styles.textClicked : styles.textUnclicked}>First</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={isSeat ? styles.sectionContent : [styles.sectionContent, styles.sectionContentLast]}>
                        <Text style={styles.sectionSubtitle}>Seat</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={isSeat}
                            onValueChange={checkSeat}
                            color={isSeat ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    {isSeat && (
                        <View style={[styles.sectionContentDropdown, styles.sectionContentLast]}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonFirst, isAisle ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleAisle}
                            >
                                <Text style={isAisle ? styles.textClicked : styles.textUnclicked}>Aisle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonLast, isWindow ? styles.buttonClicked : styles.buttonUnclicked]}
                                onPress={toggleWindow}
                            >
                                <Text style={isWindow ? styles.textClicked : styles.textUnclicked}>Window</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Personal Data */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Data</Text>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Legal Name</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={hasLegalName}
                            onValueChange={checkLegalName}
                            color={hasLegalName ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Date of Birth</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={hasBirthDate}
                            onValueChange={checkBirthDate}
                            color={hasBirthDate ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Business ID</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={hasBusinessID}
                            onValueChange={checkBusinessID}
                            color={hasBusinessID ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.sectionSubtitle}>Passport ID</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={hasPassportID}
                            onValueChange={checkPassportID}
                            color={hasPassportID ? '#1F5FC1' : '#000'}
                        />
                    </View>
                    <View style={[styles.sectionContent, styles.sectionContentLast]}>
                        <Text style={styles.sectionSubtitle}>Flight Schedule</Text>
                        <Checkbox
                            style={styles.checkbox}
                            disabled
                            value={true}
                            color={'#1F5FC1'}
                        />
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
        marginBottom: 50,
    },
    section: {
        width: 343,
        marginTop: 25,
    },
    sectionTitle: {
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
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: -1,
    },
    sectionText: {
        flex: 5,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#000',
        padding: 10,
        paddingLeft: 15,
        paddingBottom: 5,
    },
    sectionDesc: {
        fontSize: 11,
        color: '#676767',
        paddingLeft: 15,
        paddingBottom: 5,
    },
    sectionContentLast: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    sectionContentDropdown: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
        marginTop: -1,
    },
    toggle: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    checkbox: {
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 15,
        marginLeft: 300,
        alignSelf: 'center',

    },
    buttonFirst: {
        borderBottomLeftRadius: 15,
    },
    button: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        marginLeft: -1,
    },
    buttonLast: {
        borderBottomRightRadius: 15,
    },
    buttonClicked: {
        backgroundColor: '#1F5FC1',
    },
    buttonUnclicked: {
        backgroundColor: '#fff',
    },
    textClicked: {
        fontSize: 11,
        color: '#fff',
    },
    textUnclicked: {
        fontSize: 11,
        color: '#000',
    },
    tooltip: {
        width: 15,
        height: 15,
    },
    tooltipPosition: {
        justifyContent: 'center',
        marginTop: 5,
    }
});
