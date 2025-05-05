export enum DateTimeFormat {
  FullYearDash = "YYYY-MM-DD",
  FullDateDash = "DD/MM/YYYY",
  FullYearFormatDash = "YYYY/MM/DD",
  FullMonthDash = "MM/DD/YYYY",
  APIFormat = "YYYY-MM-DD HH:mm:ss",
  FullDateShortMonth = "MMM DD, YYY",
  DateMonth = "DD/MM",
  DateMonthDash = "MM-YYYY",
  MonthYear = "MM, YYYY",
  Year = "YYYY",
  Month = "MM",

  FullDateTime = "DD/MM/YYYY hh:mm:ss",
  DateTimeAmPm = "DD/MM/YYYY hh A",
  DateTime24h = "DD/MM/YYYY HH:mm",
  Time = "hh:mm:ss",
  FullDate = "DD MMM YYYY",
  TimeHourMinPM = "HH:mm A",
  HourMinutes = "HH:mm",

  TimeFullDateDash = "HH:mm - DD/MM/YYYY",
  TimeFullDateDashReverse = "HH:mm - YYYY/MM/DD",
  DateTime24hReverse = "HH:mm DD/MM/YYYY",
  Time24hDateFullReverse = "HH:mm:ss YYYY/MM/DD",
  AmPmDateMonthYear = "HH:mm A - DD/MM/YYYY",

  NameMonthYear = "MMMM YYYY",
  DateMonthYear = "DD-MM-YYYY",

  FullDateDashLowercase = "dd/MM/yyyy",
  DateTime24hFull = "HH:mm:ss DD/MM/YYYY",
  FullYearFormatDashJpn = "YYYY年MM月DD日",
}

export const DEFAULT_FORMAT_DATE_TIME = "dd/MM/yyyy";
