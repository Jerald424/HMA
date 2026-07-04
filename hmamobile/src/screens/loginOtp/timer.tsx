import { useEffect, useState } from 'react';
import HMAText from 'src/components/styled/atoms/text';

interface ResendTimerProps {
  /** in seconds */
  duration: number;
  onResendEnabled: () => void;
  isResendEnabled?: boolean;
}

export default function ResendTimer({
  duration,
  onResendEnabled,
  isResendEnabled,
}: ResendTimerProps) {
  const [count, setCount] = useState(duration);

  // reset when duration changes (or component remounts via key)
  useEffect(() => {
    setCount(duration);
  }, [duration]);

  // tick + fire callback, kept out of the updater
  useEffect(() => {
    if (count <= 0) {
      onResendEnabled?.();
      return;
    }
    const timerId = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(timerId);
  }, [count, onResendEnabled]);

  function formatTime(totalSeconds: number): string {
    const safeSeconds = Math.max(0, totalSeconds);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  if (isResendEnabled) return null;
  return <HMAText style={{ minWidth: 50 }}> - {formatTime(count)}</HMAText>;
}
