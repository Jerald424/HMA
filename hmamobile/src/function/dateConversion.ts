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
