import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lessonActions from '../actions/lesson';
import * as studentActions from '../actions/student';
import RollUpComponent from '../components/rollUp/RollUp';
import { NotificationManager} from 'react-notifications';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.div`
  width: 100%;
  text-align: center;
  color: #0366d6;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #020783;
  }
`;

class RollUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.oSuccessRollUp = this.oSuccessRollUp.bind(this);
    this.onErrorRollUp = this.onErrorRollUp.bind(this);
    this.handleRollUp = this.handleRollUp.bind(this);
  }

  componentDidMount() {
    this.fetchClassByLessonId();
    
  }

  onSuccess() {
    this.setState({ isLoading: false });
  }

  onError() {
    this.setState({ isLoading: false });
  }

  oSuccessRollUp(response) {
    const { data } = response;
    const { match, history } = this.props;
    if (200 < parseInt(data.code) && parseInt(data.code) < 300) {
      NotificationManager.success('Sinh viên điểm danh thành công');
      setTimeout(() => {
        window.location.href = `${window.location.origin}/${match.params.lessonId}/students`;
      }, 1000);
    } else {
      NotificationManager.error(data.error, 'Lỗi', 3000);
    }
  }

  onErrorRollUp(error) {
    console.log('error', error);
  }

  handleRollUp(studentCode) {
    const { actions, match } = this.props;
    const { lessonId } = match.params;
    actions.studentActions.rollUp(lessonId, studentCode, this.oSuccessRollUp, this.onErrorRollUp);
  }

  fetchClassByLessonId() {
    const { match, actions } = this.props;
    this.setState({ isLoading: true });
    const { lessonId } = match.params;
    actions.lessonActions.fetchClassByLessonId(lessonId, this.onSuccess, this.onError);
  }

  render() {
    const { data, match } = this.props;
    return (
      <div>
        <RollUpComponent
          classDetail={data.lesson.classDetail}
          isLoading={this.state.isLoading}
          rollUp={this.handleRollUp}
        />
        <Title className="mt-3" onClick={this.goToLessonStudentsScreen}>
          <Link to={`/${match.params.lessonId}/students`}>
            Xem danh sách điểm danh >>
          </Link>
        </Title>
      </div>
    );
  }
}

RollUp.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      lesson: state.lesson,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      lessonActions: bindActionCreators(lessonActions, dispatch),
      studentActions: bindActionCreators(studentActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RollUp);
