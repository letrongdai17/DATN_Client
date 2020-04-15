import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../actions/auth';
import * as classesAction from '../actions/classes';
import hustLogo from '../theme/imgs/hust_logo.png';

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
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

const renderClassesTable = (data) => {
  return (
    <table className="table">
      {renderThead()}
      <tbody>
        {renderTbody(data)}
      </tbody>
    </table>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.classes.fetchClassesData(() => {}, () => {});
    actions.auth.getMe(() => {}, () => {});
  }

  renderAccount() {
    const { data } = this.props;
    const user = data.me;
    return (
      <div>
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
          <Link href="">{item.subject_name || ''}</Link>
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

  renderClasses() {
    const { data } = this.props;
    
    return (
      <div>
        <Title>Danh sách lớp giáo viên quản lý</Title>
      </div>
    );
  }

  render() {
    const { classes } = this.props.data;

    return (
      <Container className="container">
        <img src={hustLogo} />
        {this.renderAccount()}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
