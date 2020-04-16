import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../actions/auth';
import * as classesAction from '../actions/classes';
import Header from '../components/common/Header';

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.h3`
  text-decoration: underline;
`;

const Link = styled.a``;

const renderThead = () => (
  <thead className="thead-dark">
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Tên môn học</th>
      <th scope="col">Mã môn học</th>
      <th scope="col">Mã lớp</th>
    </tr>
  </thead>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.redirectToClassDetail = this.redirectToClassDetail.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.classes.fetchClassesData(() => {}, () => {});
  }

  redirectToClassDetail(id) {
    const { history } = this.props;

    history.push(`/classes/${id}/lessons`);
  }

  renderAccount() {
    const { data } = this.props;
    const user = data.me;
    return (
      <div className="mt-4">
        <Title>Thông tin giáo viên</Title>
        <div className="row">
          <div className="col-3">
            <label>Email</label>
          </div>
          <p>{user.email}</p>
        </div>

        <div className="row">
          <div className="col-3">
            <label>Name</label>
          </div>
          <p>{user.name}</p>
        </div>

        <div className="row">
          <div className="col-3">
            <label>Số điện thoại</label>
          </div>
          <p>{user.tel}</p>
        </div>
      </div>
    );
  }

  renderTbody(data) {
    if (!data || data.length === 0) {
      return (
        <tr col="4">
          <td>Không có dữ liệu lớp giáo viên quản lý</td>
        </tr>
      );
    }
  
    return data.map((item, index) => (
      <tr key={item.id}>
        <th scope="row">{index + 1}</th>
        <td>
          <Link
            onClick={() => this.redirectToClassDetail(item.id)}
          >
            {item.subject_name || ''}
          </Link>
        </td>
        <td>{item.subject_code || ''}</td>
        <td>{item.class_code || ''}</td>
      </tr>
      ));
  };

  renderClassesTable(data) {
    return (
      <table className="table">
        {renderThead()}
        <tbody>
          {this.renderTbody(data)}
        </tbody>
      </table>
    );
  }

  render() {
    const { classes, me } = this.props.data;
    const { actions } = this.props;

    return (
      <Container className="container">
        <Header
          me={me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
        />
        {this.renderAccount()}
        <Title className="my-2">Danh sách lớp giáo viên quản lý</Title>
        {this.renderClassesTable(classes.data)}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: {
      me: state.auth.me,
      classes: state.classes,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(authActions, dispatch),
      classes: bindActionCreators(classesAction, dispatch),
    },
  };
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
