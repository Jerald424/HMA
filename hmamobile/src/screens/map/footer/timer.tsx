import { memo, useEffect, useState } from 'react';
import HMAText from 'src/components/styled/atoms/text';
import { jsDateToTimeFormat } from 'src/function/dateConversion';

function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HMAText align="center" size="title">
      {jsDateToTimeFormat(time)}
    </HMAText>
  );
}

export default memo(Timer);
