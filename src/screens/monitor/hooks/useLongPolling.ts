import {useCallback, useEffect, useRef, useState} from "react";

export interface UseLongPollingProps {
  fetch: (page: number, pageSize: number, sourceOfInterest?: string[]) => void;
  page: number;
  pageSize: number;
  sourcesOfInterest: string[];
}

export function useLongPolling({ fetch, page, pageSize, sourcesOfInterest }: UseLongPollingProps) {
  const [time, setTime] = useState(new Date());
  const interval = useRef<any>();

  const startTickLongPulling = useCallback(() => {
    interval.current = setTimeout(async () => {
      await fetch(page, pageSize, sourcesOfInterest);
      if (page === 0) {
        setTime(new Date());
      }
    }, 5000);
  }, [fetch, page, pageSize, sourcesOfInterest]);

  useEffect(() => {
    if (interval.current) {
      clearTimeout(interval.current);
      startTickLongPulling();
    }
  }, [sourcesOfInterest, startTickLongPulling]);

  useEffect(() => {
    startTickLongPulling();

    return () => {
      clearTimeout(interval.current);
    }
  }, [time, startTickLongPulling]);
}
