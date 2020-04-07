import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SignInComponent from '../components/auth/SignIn';
import * as authActions from '../actions/auth';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperSignInComponent = styled.div`
  width: 40%;
  min-width: 350px;
`;

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions, history } = this.props;

    return (
      <Wrapper>
        <WrapperSignInComponent>
          <SignInComponent
            signIn={actions.auth.signIn}
            history={history}
          />
        </WrapperSignInComponent>
      </Wrapper>
    );
  }
}

SignIn.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      auth: state.auth,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
