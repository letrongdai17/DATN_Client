import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import DatePicker from "react-datepicker";
import { VALIDATE_TYPES } from '../../helpers/constants';
import { getValidateErrors } from '../../helpers/validator';

const WrapperDateTimeInput = styled.div`
  input {
    font-size: 13px;
    border-radius: 4px;
    box-shadow: inset 0 2px 2px #e9e9e9;
    border: 1px solid #aeaeae;
    line-height: 16px;
    padding: 6px 10px 5px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  height: 18px !important;
`;

class LessonCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: {
        value: null,
        error: '',
      },
      endTime: {
        value: null,
        error: '',
      },
    };

    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleCreateLesson = this.handleCreateLesson.bind(this);
  }
  
  componentDidMount() {
  }

  isFormValid() {
    const { startTime, endTime } = this.state;

    return startTime.value && endTime.value;
  }

  setErrors() {
    const { startTime, endTime } = this.state;
    startTime.error = startTime.value ? '' : 'Thêm giá trị cho trường bắt đầu';
    endTime.error = endTime.value ? '' : 'Thêm giá trị cho trường kết thúc';
    this.setState({ startTime, endTime });
  }

  handleFocus(type) {
    const currentState = { ...this.state };
    currentState[type].isFocus = true;
    this.setState(currentState);
  }

  handleBlur(type) {
    const currentState = { ...this.state };
    currentState[type].isFocus = false;
    this.setState(currentState);
  }

  handleChangeStartTime(date) {
    const { startTime } = this.state;
    startTime.value = date;
    this.setState({ startTime });
  }

  handleChangeEndTime(date) {
    const { endTime } = this.state;
    endTime.value = date;
    this.setState({ endTime });
  }

  handleCreateLesson() {
    const { createLesson } = this.props;
    const { startTime, endTime } = this.state;
    if (this.isFormValid()) {
      createLesson(startTime.value, endTime.value);
    }
    this.setErrors();
  }

  renderCreateForm() {
    const { startTime, endTime } = this.state;

    return (
      <div>
        <div className="row mx-3 mt-3 mb-0">
          <div className="col-3">Bắt đầu</div>
          <WrapperDateTimeInput className="col-9">
            <DatePicker
              selected={startTime.value}
              onChange={this.handleChangeStartTime}
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
              maxDate={endTime.value}
            />
          </WrapperDateTimeInput>
        </div>
        {
          startTime.error
            ? (<Error className="row mx-3">
                <div className="offset-3 col-9">{startTime.error}</div>
              </Error>)
            : null
        }
        <div className="row mx-3 mt-3 mb-0">
          <div className="col-3">Kết thúc</div>
          <WrapperDateTimeInput className="col-9">
            <DatePicker
              selected={endTime.value}
              onChange={this.handleChangeEndTime}
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
              minDate={startTime.value}
            />
          </WrapperDateTimeInput>
        </div>
        {
          endTime.error
            ? (<Error className="row mx-3">
                <div className="offset-3 col-9">{endTime.error}</div>
              </Error>)
            : null
        }
      </div>
    );
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thêm tiết học</ModalHeader>

        <ModalBody>
          {this.renderCreateForm()}
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={toggle}>Hủy</Button>
          <Button color="primary" onClick={this.handleCreateLesson}>Tạo</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

LessonCreate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  createLesson: PropTypes.func.isRequired,
};

export default LessonCreate;
