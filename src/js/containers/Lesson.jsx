import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as lessonActions from '../actions/lesson';
import styled from 'styled-components';

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
    this.state = {};
  }

  componentDidMount() {
    const { actions, match } = this.props;
    const { id } = match.params;
    actions.lesson.fetchLessons(id, () => {}, () => {});
  }

  renderTopBar() {
    return (
      <TopBar>
        <button type="button" className="btn btn-primary">
          <CreateIcon><i class="fas fa-plus-circle" /></CreateIcon>
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
    return (
      <div className="container">
        {this.renderTopBar()}
        {this.renderLessonsTable()}
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
