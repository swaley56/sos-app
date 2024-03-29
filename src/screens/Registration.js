import React from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import * as Contacts from 'expo-contacts';
import { Button, Icon, Div } from 'react-native-magnus';

import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import { Error } from '../components/Error';
import { IconButton } from '../components/IconButton';
import { AuthContext } from '../contexts/AuthContext';
import { Loading } from '../components/Loading';

import { selectContactPhone } from 'react-native-select-contact';
import { requestPermissionsAsync } from 'expo-location';

const Toast = ({ visible, message }) => {
	if (visible) {
		ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
		return null;
	}
	return null;
};

export default function RegistratonScreen({ navigation }) {
	const { register } = React.useContext(AuthContext);
	const [username, setUsername] = React.useState('');
	const [fullName, setFullname] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [phoneNumber, setPhonenumber] = React.useState('');
	const [con1, setContacts] = React.useState('');
	const [con2, setContact2] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [visibleToast, setvisibleToast] = React.useState(false);

	React.useEffect(() => setvisibleToast(false), [visibleToast]);

	// React.useEffect(() => {
	// 	(async () => {
	// 		const { status } = await Contacts.requestPermissionsAsync();
	// 		if (status == 'granted') {
	// 			console.log('permission granted');
	// 		}
	// 	})();
	// }, []);

	const handleButtonPress = () => {
		setvisibleToast(true);
	};

	const getPhoneNumber = () => {
		requestPermissionsAsync();
		return selectContactPhone().then((selection) => {
			let { contact, selectedPhone } = selection;

			setContacts(selectedPhone.number);
			console.log(selectedPhone.number);
		});
	};

	const getPhoneNumbe = () => {
		return selectContactPhone().then((selectio) => {
			let { contact, selectedPhone } = selectio;
			setContact2(selectedPhone.number);

			console.log(selectedPhone.number);
		});
	};

	const emergency_contacts = [];
	emergency_contacts.push(con1, con2);

	return (
		<ScrollView>
			<View style={styles.container}>
				<Heading style={styles.title}>REGISTRATION</Heading>

				<Error error={error} />
				<Input style={styles.input} placeholder={'Username'} value={username} onChangeText={setUsername} />
				<Input style={styles.input} placeholder={'Fullname'} value={fullName} onChangeText={setFullname} />
				<Input
					style={styles.input}
					placeholder={'Password'}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<Input
					style={styles.input}
					placeholder={'Emergency Conatact 1'}
					value={con1}
					onChangeText={setContacts}
				/>

				<Button
					// mt="lg"
					ml="3xl"
					px="xl"
					// py="lg"
					// p={12}
					bg="brand900"
					rounded="circle"
					color="white"
					shadow={2}
					onPress={() => {
						getPhoneNumber();
					}}
					prefix={<Icon name="add-user" mr="sm" color="white" fontFamily="Entypo" />}
				>
					Select Contact
				</Button>
				
				<Input
					style={styles.input}
					placeholder={'Emergency Conatact 2'}
					value={con2}
					onChangeText={setContact2}
				/>
				<Button
					style={styles.contact}
					// mt="lg"
					ml="3xl"
					px="xl"
					// py="lg"
					bg="brand900"
					rounded="circle"
					color="white"
					shadow={2}
					onPress={() => {
						getPhoneNumbe();
					}}
					prefix={<Icon name="add-user" mr="sm" color="white" fontFamily="Entypo" />}
				>
					Select Contact
				</Button>
				<Input
					style={styles.input}
					placeholder={'Phone Number'}
					value={phoneNumber}
					onChangeText={setPhonenumber}
				/>
				<FilledButton
					title={'REGISTER'}
					style={styles.loginbutton}
					onPress={async () => {
						try {
							setLoading(true);
							await register(username, fullName, password, emergency_contacts, phoneNumber);
							handleButtonPress();
							navigation.navigate('LoginStack');
						} catch (error) {
							setError(error.message);
							setLoading(false);
						}
					}}
				/>
				<Loading loading={loading} />
				<Toast style={styles.toast} visible={visibleToast} message="Regisered Successfully" />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 28,
		paddingTop: 120,
		alignItems: 'center',
	},
	title: {
		// marginVertical:28,
		marginBottom: 40,
	},
	input: {
		marginVertical: 8,
	},
	loginbutton: {
		marginVertical: 30,
	},
	closeIcon: {
		// left: 10
		// position: 'absolute',
		// top: 30,
		right: 115,
	},
	toast: {
		paddingTop: Constants.statusBarHeight,
	},
	contact: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
