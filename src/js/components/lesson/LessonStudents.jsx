import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ThStyled, TdStyled, CheckIcon, WrapperCheckIcon,
  TableScrollX,
} from '../home/ClassStudents';
import { convertToLocalTime } from '../../helpers/utils';

const Container = styled.div`
  margin-top: 1em;
`;

const SubjectNameTitle = styled.div`
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  color: blue;

  span:first-child {
    font-size: 20px;
    font-weight: 600;
  }
`;

const Title = styled.span`
`;

const renderThead = () => (
  <thead className="thead-dark">
     <tr>
        <ThStyled scope="col">STT</ThStyled>
        <ThStyled scope="col">Họ và tên</ThStyled>
        <ThStyled scope="col">MSSV</ThStyled>
        <ThStyled scope="col">Lớp</ThStyled>
        <ThStyled scope="col">Ngày sinh</ThStyled>
        <ThStyled scope="col">Trạng thái</ThStyled>
     </tr>
  </thead>
);

const renderStudentsData = (data) => {
  if (!data || data.length === 0) {
    return (
      <tr>
        <TdStyled col="5">Không có danh sách sinh viên lớp</TdStyled>
      </tr>
    );
  }

  return data.map((item, index) => (
    <tr key={item.id}>
      <TdStyled>{index + 1}</TdStyled>
      <TdStyled>{item.name}</TdStyled>
      <TdStyled>{item.student_code}</TdStyled>
      <TdStyled>{item.class_name}</TdStyled>
      <TdStyled>{item.birth_day}</TdStyled>
      <TdStyled>
        {
          <WrapperCheckIcon>
            <span hidden={!item.is_rolled_up}>
              <CheckIcon
                className="fas fa-check"
                checked
              />
            </span>
            <span hidden={item.is_rolled_up}>
              <CheckIcon
                className="fas fa-ban"
                checked={false}
              />
            </span>
          </WrapperCheckIcon>
        }
      </TdStyled>
    </tr>
  ));
};

class ClassStudents extends Component {
  componentDidMount() {}

  renderTableData() {
    const { students } = this.props;

    return (
      <TableScrollX className="table">
        {renderThead()}
        <tbody>
          {renderStudentsData(students)}
        </tbody>
      </TableScrollX>
    );
  }

  render() {
    const { detail } = this.props;

    return (
      <Container className="container">
        <SubjectNameTitle>
          <span>{detail.subject_name} {' '}</span>
          <Title>({convertToLocalTime(detail.start_time)}</Title>
          <span>{`   -   `}</span>
          <Title>{convertToLocalTime(detail.end_time)})</Title>
        </SubjectNameTitle>
        {this.renderTableData()}
      </Container>
    );
  }
}

ClassStudents.propTypes = {
  students: PropTypes.array.isRequired,
  detail: PropTypes.object.isRequired,
};

export default ClassStudents;
