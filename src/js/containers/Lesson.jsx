import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as lessonActions from '../actions/lesson';
import * as authActions from '../actions/auth';
import styled from 'styled-components';
import LessonCreate from '../components/lesson/LessonCreate';
import { convertToUTCTime, convertToLocalTime } from '../helpers/utils';
import { NotificationManager} from 'react-notifications';
import Header from '../components/common/Header';

const renderThead = () => (
  <thead className="thead-dark">
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Ngày</th>
      <th scope="col">Giờ bắt đầu</th>
      <th scope="col">Giờ kết thúc</th>
      <th />
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
    this.redirectToQRCodeScreen = this.redirectToQRCodeScreen.bind(this);
  }

  componentDidMount() {
    this.fetchLessons();
  }

  onSuccess() {
    this.setState({ isOpen: false });
    this.fetchLessons();
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

  redirectToQRCodeScreen() {
    const { history, match } = this.props;
    const { id } = match.params;
    history.push(`/${id}/qr-code`);
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

    return lesson.data.map((item, index) => {
      const start = convertToLocalTime(item.start_time);
      const end = convertToLocalTime(item.end_time);
      const isInLessonTime = new Date(start).getTime() < new Date().getTime()
        && new Date().getTime() < new Date(end).getTime();

      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{dayjs(start).format('DD/MM/YYYY')}</td>
          <td>{dayjs(start).format('HH:mm:ss')}</td>
          <td>{dayjs(end).format('HH:mm:ss')}</td>
          <td><button type="button" className="btn btn-info">Chi tiết</button></td>
          <td>
            {
              isInLessonTime
                ? <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.redirectToQRCodeScreen}
                  >Tạo QR Code</button>
                : null
            }
          </td>
        </tr>
      );
    }
    );
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
    const { data, actions } = this.props;

    return (
      <div className="container">
        <Header
          me={data.me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
        />
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
      me: state.auth.me,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      lesson: bindActionCreators(lessonActions, dispatch),
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
