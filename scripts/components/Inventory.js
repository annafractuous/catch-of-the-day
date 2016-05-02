import React from 'react';
import autobind from 'autobind-decorator';
import AddFishForm from './AddFishForm';

// Authentication
import Firebase from 'firebase';
const ref = new Firebase('https://the-daily-catch.firebaseio.com/');

/*
  Inventory Manager
*/

@autobind
class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: ''
    }
  }

  // on load, check to see if user is logged in
  componentWillMount() {
    var token = localStorage.getItem('token');
    if(token) {
      ref.authWithCustomToken(token, this.authHandler);
    }
  }

  // authenticate when user tries to log in
  authenticate(provider) {
    ref.authWithOAuthPopup(provider, this.authHandler);
  }

  // when user logs in...
  authHandler(error, authData) {
    // error if it doesn't work
    if(error) {
      console.error(error);
      return;
    }

    // save their auth token in local storage
    localStorage.setItem('token', authData.token);

    const storeRef = ref.child(this.props.params.storeId);
    storeRef.on('value', (snapshot)=>{
      var data = snapshot.val() || {};

      // if current store doesn't have an owner, set current user as owner
      if(!data.owner) {
        storeRef.set({
          owner: authData.uid
        });
      }

      // update state with current user and store owner
      this.setState({
        uid: authData.uid,
        owner: data.owner || authData.uid
      });
    });
  }

  // when user logs out, deauthorize them, remove their auth token from local storage, and reset current user
  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid: null
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Please sign in to manage your store's inventory.</p>
        <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>Log In with Facebook</button>
        <button className="twitter" onClick={this.authenticate.bind(this, 'twitter')}>Log In with Twitter</button>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In with Github</button>
      </nav>
    )
  }

  renderInventory(key) {
    var linkState = this.props.linkState;
    return (
      <form key={key} className="fish-edit" onSubmit={this.createFish}>
        <input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
        <input type="text" valueLink={linkState('fishes.' + key + '.price')}/>
        <select valueLink={linkState('fishes.' + key + '.status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.' + key + '.image')}/>
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </form>
    )
  }

  render() {
    let logoutButton = <button onClick={this.logout}>Log Out</button>

    // if user is logged out, show login buttons
    if(!this.state.uid){
      return (
        <div>{this.renderLogin()}</div>
      )
    }

    // if user is logged in but not the store owner
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry, looks like this account doesn't own this store.</p>
          {logoutButton}
        </div>
      )
    }

    // if user is logged in as store owner
    return (
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  linkState: React.PropTypes.func.isRequired
}

export default Inventory;
