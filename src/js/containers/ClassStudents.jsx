import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import * as classesActions from '../actions/classes';
import ClassStudentsComponent from '../components/home/ClassStudents';
import Header from '../components/common/Header';

class ClassStudents extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { classId } = match.params;
    this.fetchClassStudentsRolledUp(classId);
  }

  fetchClassStudentsRolledUp(classId) {
    const { actions } = this.props;
    actions.classesActions.fetchClassStudentsRolledUp(
      classId,
      () => {},
      () => {},
    );
  }

  render() {
    const { data, actions } = this.props;
    return (
      <div className="container">
        <Header
          me={data.me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
        />
        <ClassStudentsComponent
          students={data.classes.studentsRolledUp}
          lessonsDate={data.classes.lessonsDate}
        />
      </div>
    );
  }
}

ClassStudents.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      classes: state.classes,
      me: state.auth.me,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      classesActions: bindActionCreators(classesActions, dispatch),
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassStudents);