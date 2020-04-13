import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../actions/auth';
import hustLogo from '../theme/imgs/hust_logo.png';
import Account from '../components/home/Account';
import Classes from '../components/home/Classes';

const Container = styled.div`
  margin-top: 20px;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.auth.getMe(() => {}, () => {});
  }

  renderAccount() {
    const { data } = this.props;
    const user = data.me;
    console.log('user: ', user);
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <label>Email</label>
          </div>
          <p>{user.email}</p>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label>Name</label>
          </div>
          <p>{user.name}</p>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label>Số điện thoại</label>
          </div>
          <p>{user.tel}</p>
        </div>
      </div>
    );
  }

  renderClasses() {
    
  }

  render() {
    const { data } = this.props;
    return (
      <Container className="container">
        <img src={hustLogo} />
        {this.renderAccount()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: {
      me: state.auth.me,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
