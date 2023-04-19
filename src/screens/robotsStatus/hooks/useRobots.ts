import {RobotDTO} from "../../../services/api/dtos/robot";
import {useCallback, useEffect, useState} from "react";
import {robotApiService} from "../../../services/api/RobotApiService";

export const useRobots = () => {
  const [robots, setRobots] = useState<RobotDTO[]>([]);

  const fetchRobots = useCallback(async () => {
    const robots = await robotApiService.getRobots();
    setRobots(robots);
  }, []);

  useEffect(() => {
    fetchRobots();
  }, []);

  return {
    robots,
    fetchRobots,
  }
}
