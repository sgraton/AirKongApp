
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { 
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { logout, addPayment } from '../../actions/user';
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_test_SVBeP6bWSz1D3JfQTOxYavao',
  androidPayMode: 'test', // Android only
});

const options = {
  requiredBillingAddressFields: 'full',
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  menuButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 20,
  }, 
  menuButtonText: {
    fontSize: 20,
  },
});

class ProfileTab extends Component {

  addPayment = async() => {
    const token = await stripe.paymentRequestWithCardForm(options);
    this.props.addPayment(token.tokenId)
  }

  switchType() {
    const firstRouteName = this.props.navigation.dangerouslyGetState().routes[0].name;

    if (firstRouteName === 'Explore') {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Host' },
          ],
        })
      );
    } else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Main' },
          ],
        })
      );
    }
  }

  render() {
    const firstRouteName = this.props.navigation.dangerouslyGetState().routes[0].name;
    const profile = this.props.profile || {}
    const payment = this.props.payment

    return (
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.name}>{profile.fullname}</Text>
          <Image style={styles.avatar} source={{uri: profile.avatar}} />
        </View>

        <TouchableOpacity onPress={() => this.addPayment().catch(e => console.log(e))} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>{`${payment ? 'Update' : 'Add'}`} Your Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.switchType()} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Switch To {`${firstRouteName === 'Explore' ? 'Host' : 'Guest'}`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.logout()} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  payment: state.user.payment,
  routes: state.routes,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  addPayment: (stripeToken) => dispatch(addPayment(stripeToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
