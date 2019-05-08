import React from 'react';
import PropTypes from 'prop-types';
import Div from 'components/Base/Div';
import string from 'utils/string';

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    const currentDiff = (this.props.targetTime - Date.now()) / 1000;
    this.state = { time: {}, seconds: currentDiff };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    const timeLeft = this.secondsToTarget(this.state.seconds);
    this.startTimer();
    this.setState({ time: timeLeft });
  }

  secondsToTarget(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / (60 * 60));
    const conversionFactor = timeInSeconds % (60 * 60);
    const minutes = Math.floor(conversionFactor / 60);
    const seconds = Math.ceil(conversionFactor % 60);
    const currentSnapshot = {
      hours,
      minutes,
      seconds,
    };
    return currentSnapshot;
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTarget(seconds),
      seconds,
    });
    if (seconds < 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { hours, minutes, seconds } = this.state.time;
    let countDownTime;
    if (hours >= 0 && minutes >= 0 && seconds >= 0) {
      const correctedSeconds = seconds === 60 ? 0 : seconds;
      const padWidth = 2;
      const paddedHours = string.addZeroPadding(hours, padWidth);
      const paddedMinutes = string.addZeroPadding(minutes, padWidth);
      const paddedSeconds = string.addZeroPadding(correctedSeconds, padWidth);
      countDownTime = (
        <Div>
          {window.interpolate(
            '%(paddedHours)s : %(paddedMinutes)s : %(paddedSeconds)s',
            { paddedHours, paddedMinutes, paddedSeconds },
            true
          )}
        </Div>
      );
    } else {
      countDownTime = <Div>{window.gettext('00 : 00 : 00')}</Div>;
    }
    return `${countDownTime} remaining...`;
  }
}

CountDown.propTypes = {
  targetTime: PropTypes.number,
};

export default CountDown;
