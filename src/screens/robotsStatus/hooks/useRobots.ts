import {RobotDTO} from "../../../services/api/dtos/robot";
import {robotApiService} from "../../../services/api/RobotApiService";
import {useApiService} from "../../../hooks/useApiService";

export const useRobots = () => {
  const { data } = useApiService<RobotDTO[]>(robotApiService, robotApiService.getRobots);

  return {
    robots: data || [],
  }
}
