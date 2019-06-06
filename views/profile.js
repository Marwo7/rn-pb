import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import BasicButton from '../components/button';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = async () => {
    await AsyncStorage.removeItem('@userToken');
    this.props.navigation.navigate('Auth');
  };

  componentDidMount = async () => {
    try {
      const userToken = await AsyncStorage.getItem('@userToken');
      this.setState({ name: userToken });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {' '}
          <Text style={styles.titlePrefix}>Login: </Text>
          {this.state.name}
        </Text>
        <BasicButton
          title="Change Password"
          onPress={() => this.props.navigation.push('Edit')}
        />
        <BasicButton
          title="Logout"
          onPress={this.handleLogout}
          style={styles.logoutButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 32,
    justifyContent: 'flex-start'
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#FF3B30',
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    width: '100%'
  },
  title: {
    fontSize: 32,
    padding: 32
  },
  titlePrefix: {
    fontWeight: '300'
  }
});