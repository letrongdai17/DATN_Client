import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as lessonActions from '../actions/lesson';
import styled from 'styled-components';
import LessonCreate from '../components/lesson/LessonCreate';
import { convertToUTCTime } from '../helpers/utils';
import { NotificationManager} from 'react-notifications';

const renderThead = () => (
  <thead className="thead-dark">
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Ngày</th>
      <th scope="col">Giờ bắt đầu</th>
      <th scope="col">Giờ kết thúc</th>
      <th />
    </tr>
  </thead>
);

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const CreateIcon = styled.span`
  margin-right: 0.5rem;
`;

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.createLesson = this.createLesson.bind(this);
  }

  componentDidMount() {
    this.fetchLessons();
  }

  onSuccess() {
    this.setState({ isOpen: false });
  }

  onError(err) {
    let errorMessage = '';
    try {
      const { data } = err.response;
      errorMessage = data.error;
    } catch (e) {
      errorMessage = 'Lỗi server';
    } finally {
      NotificationManager.error(errorMessage, 'Lỗi', 3000);
    }
  }

  fetchLessons() {
    const { actions, match } = this.props;
    const { id } = match.params;
    actions.lesson.fetchLessons(id, () => {}, () => {});
  }

  openModal() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  createLesson(startTime, endTime) {
    const { actions, match } = this.props;
    const { id } = match.params;

    const start = convertToUTCTime(startTime);
    const end = convertToUTCTime(endTime);
    actions.lesson.createLesson(id, start, end, this.onSuccess, this.onError);
  }

  renderTopBar() {
    return (
      <TopBar>
        <button type="button" className="btn btn-primary" onClick={this.openModal}>
          <CreateIcon><i className="fas fa-plus-circle" /></CreateIcon>
          Tạo tiết học
        </button>
      </TopBar>
    );
  }

  renderLessonsData() {
    const { lesson } = this.props.data;

    if (!lesson.data || lesson.data.length == 0) {
      return (
        <tr col="4">
          <td>Không có dữ liệu tiết học</td>
        </tr>
      );
    }

    return lesson.data.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{dayjs(item.start_time).format('DD/MM/YYYY')}</td>
        <td>{dayjs(item.start_time).format('HH:mm:ss')}</td>
        <td>{dayjs(item.end_time).format('HH:mm:ss')}</td>
        <td>Chi tiết</td>
      </tr>
    ));
  }

  renderLessonsTable() {
    return (
      <table className="table">
        {renderThead()}
        <tbody>
          {this.renderLessonsData()}
        </tbody>
      </table>
    );
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div className="container">
        {this.renderTopBar()}
        {this.renderLessonsTable()}
        <LessonCreate
          isOpen={isOpen}
          toggle={this.openModal}
          createLesson={this.createLesson}
        />
      </div>
    );
  }
}

Lesson.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
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
      lesson: bindActionCreators(lessonActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
