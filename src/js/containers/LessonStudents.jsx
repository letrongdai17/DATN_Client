import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import * as lessonActions from '../actions/lesson';
import LessonStudentsComponent from '../components/lesson/LessonStudents';
import Header from '../components/common/Header';

class LessonStudents extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { lessonId } = match.params;
    this.fetchClassStudentsRolledUp(lessonId);
    console.log('did mount: ');
  }

  fetchClassStudentsRolledUp(lessonId) {
    const { actions } = this.props;
    actions.lessonActions.fetchLessonStudentsRolledUp(
      lessonId,
      () => {},
      () => {},
    );
  }

  render() {
    const { data, actions } = this.props;
    console.log('studenst: ', data.lesson.studentsRolledUp);
    return (
      <div className="container">
        <Header
          me={data.me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
        />
        <LessonStudentsComponent
          students={data.lesson.studentsRolledUp}
          detail={data.lesson.detail}
        />
      </div>
    );
  }
}

LessonStudents.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      lesson: state.lesson,
      me: state.auth.me,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      lessonActions: bindActionCreators(lessonActions, dispatch),
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonStudents);