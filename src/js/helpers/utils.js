import dayjs from "dayjs";
import moment from 'moment';

export function convertToLocalTime(datetime, format = 'HH:mm:ss DD/MM/YYYY') {
  const d = new Date();
  const timezoneOffset = d.getTimezoneOffset();

  if (!datetime) {
    return 'Datetime is invalid';
  }

  return dayjs(datetime).add(timezoneOffset, 'm').format(format);
}

export function convertToUTCTime(datetime, format="YYYY/MM/DD HH:mm:ss") {
  if (!datetime) {
    return 'Datetime is invalid';
  }

  return moment(datetime).utc().format(format);
}
