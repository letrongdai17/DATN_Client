import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

class LessonQRCode extends Component {
  componentDidMount() {}

  render() {
    const { lessonId } = this.props.match.params;
    return (
      <header className='App-header'>
        <div>
          <QRCode
              id='qrcode'
              value={`http://192.168.0.104:8080/${lessonId}/roll-up`}
              size={290}
              level={'H'}
              includeMargin={true}
            />
        </div>
      </header>
    );
  }
}

LessonQRCode.propTypes = {
  match: PropTypes.object.isRequired,
};

export default LessonQRCode;
