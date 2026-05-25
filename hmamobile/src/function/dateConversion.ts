export const makeColonDate = (date: Date) => {
  return `${[date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
    ':',
  )} ${[date.getHours(), date.getMinutes(), date.getSeconds()].join(':')}`;
};

export const formateDate = (date: string = '16/10/2025 15:03:53') => {
  try {
    if (!date.includes(' ')) return null;

    const [dt, time] = date.split(' ');
    let [hour, min] = time.split(':').map(Number);

    let meridiem = 'AM';

    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      meridiem = 'PM';
    } else if (hour > 12) {
      hour -= 12;
      meridiem = 'PM';
    }

    return {
      date: dt,
      time: `${hour}:${String(min).padStart(2, '0')} ${meridiem}`,
    };
  } catch (error) {
    console.log('formatDate error:', error);
    return null;
  }
};

export const jsDateToTimeFormat = (date: Date) => {
  try {
    let [hour, min, sec] = [
      date.getHours(),
      date.getMinutes().toString().padStart(2, '0'),
      date.getSeconds().toString().padStart(2, '0'),
    ];
    let meridiem = 'AM';
    if (hour > 12) {
      hour -= 12;
      meridiem = 'PM';
    }
    return `${[hour, min, sec]
      ?.map(item => String(item).padStart(2, '0'))
      .join(':')} ${meridiem}`;
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
    if (!!!date) return;
    // parse UTC date string (assumes "DD:MM:YYYY HH:mm:ss")
    const [dtStr, time] = date?.split(' ');
    const [d, m, y] = dtStr?.split('/');
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
    const output = `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}:${parts.second}`;
    return formateDate(output);
  } catch (error) {
    console.log('ERROR:', error);
  }
}

export function jsDateToDDMMYYYY(date: Date) {
  try {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
  } catch (error) {
    console.error(error);
  }
}
export function jsDateToYYYYMMDD(date: Date) {
  try {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param dateStr 2026-05-04
 * @returns
 */
export function YYYYMMDDToJsDate(dateStr: string) {
  try {
    const [year, month, date] = dateStr?.split('-');
    return new Date(+year, +month - 1, +date);
  } catch (error) {
    console.error(error);
    return new Date();
  }
}

type Period = 'this-week' | 'last-week' | 'current-month' | 'last-month';

type Range = {
  startDate: Date;
  endDate: Date;
  start: string; // "DD/MM/YYYY, HH:mm:ss"
  end: string; // "DD/MM/YYYY, HH:mm:ss"
};

/**
 * Returns start/end Date and formatted strings for the given period.
 * weekStart: 0 = Sunday, 1 = Monday (default 1).
 */
export function getRangeForPeriod(period: Period, weekStart = 0): Range {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const pad = (n: number) => String(n).padStart(2, '0');
  const fmt = (d: Date) =>
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

  const startOfDay = (d: Date) => {
    const r = new Date(d);
    r.setHours(0, 0, 0, 0);
    return r;
  };

  const endOfDay = (d: Date) => {
    const r = new Date(d);
    r.setHours(23, 59, 59, 999);
    return r;
  };

  const getThisWeekStart = () => {
    const dayIndex = today.getDay(); // 0..6
    let diff = dayIndex - weekStart;
    if (diff < 0) diff += 7;
    const s = new Date(today);
    s.setDate(today.getDate() - diff);
    return startOfDay(s);
  };

  const getThisMonthStart = () =>
    startOfDay(new Date(today.getFullYear(), today.getMonth(), 1));

  let startDate: Date;
  let endDate: Date;

  switch (period) {
    case 'this-week': {
      startDate = getThisWeekStart();
      endDate = endOfDay(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 6,
        ),
      );
      break;
    }
    case 'last-week': {
      const thisStart = getThisWeekStart();
      startDate = startOfDay(
        new Date(
          thisStart.getFullYear(),
          thisStart.getMonth(),
          thisStart.getDate() - 7,
        ),
      );
      endDate = endOfDay(
        new Date(
          thisStart.getFullYear(),
          thisStart.getMonth(),
          thisStart.getDate() - 1,
        ),
      );
      break;
    }
    case 'current-month': {
      startDate = getThisMonthStart();
      endDate = endOfDay(
        new Date(today.getFullYear(), today.getMonth() + 1, 0),
      ); // last day of month
      break;
    }
    case 'last-month': {
      const thisMonthStart = getThisMonthStart();
      startDate = startOfDay(
        new Date(
          thisMonthStart.getFullYear(),
          thisMonthStart.getMonth() - 1,
          1,
        ),
      );
      endDate = endOfDay(
        new Date(thisMonthStart.getFullYear(), thisMonthStart.getMonth(), 0),
      ); // last day previous month
      break;
    }
    default:
      // TypeScript exhaustiveness; runtime fallback
      startDate = startOfDay(today);
      endDate = endOfDay(today);
  }

  return {
    startDate,
    endDate,
    start: fmt(startDate),
    end: fmt(endDate),
  };
}

export const amtFormat = (amt: string) => {
  return `$ ${amt}`;
};
