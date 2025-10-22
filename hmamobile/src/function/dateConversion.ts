export const makeColonDate = (date: Date) => {
  return `${[date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
    ':',
  )} ${[date.getHours(), date.getMinutes(), date.getSeconds()].join(':')}`;
};

export const formateDate = (date: string = '16:10:2025 15:03:53') => {
  try {
    const [dt, time] = date?.split(' ');
    let [hour, min] = time?.split(':').map(Number);
    let meridiem = 'AM';
    if (hour > 12) {
      hour -= 12;
      meridiem = 'PM';
    }
    return {
      date: dt?.split(':').join('/'),
      time: `${[hour, min].join(':')} ${meridiem}`,
    };
  } catch (error) {
    console.log(error);
  }
};

export function convertUserTimeZone({
  date,
  timeZone,
}: {
  date: string;
  timeZone: string;
}) {
  try {
    // parse UTC date string (assumes "DD:MM:YYYY HH:mm:ss")
    const [dtStr, time] = date?.split(' ');
    const [d, m, y] = dtStr?.split(':');
    // build ISO UTC string
    const utcIso = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${time}Z`;
    // format for Asia/Qatar
    const dt = new Date(utcIso);
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = fmt
      .formatToParts(dt)
      .reduce((acc, p) => ((acc[p.type] = p.value), acc), {});
    const output = `${parts.day}:${parts.month}:${parts.year}, ${parts.hour}:${parts.minute}:${parts.second}`;
    return formateDate(output);
  } catch (error) {
    console.log('ERROR:', error);
  }
}
