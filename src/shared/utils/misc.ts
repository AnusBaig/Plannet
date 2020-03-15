import dayjs from "dayjs";
import moment from 'moment';

export function formatDate(d?: Date | string) {
  return d ? dayjs(d).format("MM/DD/YYYY") : null;
}

export function formatTime(d?: Date | string) {
  return d ? dayjs(d).format("HH:mm") : null;
}

export function getIsoDate(d: string | Date, h: string, m: string) {
  return dayjs(d)
    .set("hour", parseInt(h))
    .set("minute", parseInt(m))
    .toISOString();
}

export function formatNumberAsCurrency(number: number, toFixed: number = 2, x: number = 3) {
  // explanation of the function: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (toFixed > 0 ? '\\.' : '$') + ')';
  return number.toFixed(Math.max(0, ~~toFixed)).replace(new RegExp(re, 'g'), '$&,');
};

export function getDatesDiffInAllUnits(date1: moment.MomentInput, date2: moment.MomentInput = Date.now()) {
  return moment.duration(moment(date1).diff(moment(date2))).humanize();
}

export function getDatesAndTimeDiffInAllUnits(start: any, end: any = Date.now()) {
  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;
  var date1 = new Date(start);
  var date2 = new Date(end);

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  //take out milliseconds
  difference_ms = difference_ms / 1000;
  difference_ms = difference_ms / 60;
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var hours = Math.floor(difference_ms % 24);
  var days = Math.floor(difference_ms / 24);
  return {
    text: `${days}d ${hours}h ${minutes}m`,
    color: days ? 'black' : 'red',
    canDo: date1_ms < date2_ms
  }
}


export const StepFunction = (value: string, index: number, getDashboardData: String, phases: any, completedPhase: number) => {
  for (var i = 0; i < phases.length; i++) {
    if (i < completedPhase && value === phases[i]) {
      return 'completed'
    } else if (value === getDashboardData) {
      return 'active'
    } else {
      return ""
    }
  }
}