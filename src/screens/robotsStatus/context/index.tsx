import React, { createContext } from 'react';
import useRobots from "../hooks/useRobots";

export interface RobotStatusDto {
  id: string;
  name: string;
  status: string;
  last_run: Date;
  info: string;
}

export interface RobotsStatusProviderState {
  robotsStatus: RobotStatusDto[];
}

const defaultState: RobotsStatusProviderState = {
  robotsStatus: [],
};

export const RobotsStatusContext = createContext(defaultState);

const RobotsStatusDataProvider = ({ children }: any) => {
  const { robots } = useRobots();
  const state = {
    robotsStatus: [...robots],
  };

  return <RobotsStatusContext.Provider value={state}>{children}</RobotsStatusContext.Provider>;
};

export default RobotsStatusDataProvider;
