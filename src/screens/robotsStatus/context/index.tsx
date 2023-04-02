import React, { createContext } from 'react';

export interface RobotStatusDto {
  id: string;
  name: string;
  status: string;
  lastActivation: Date;
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
  const hardcodedRobotsData: RobotStatusDto[] = [
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Camera deputatilor',
      status: 'FUNCTIONAL',
      // lastActivation: '2023-03-18T16:25:12.000Z' as unknown as Date,
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      info: 'Descarcat documentul: "Raportul Comisiei juridică, de disciplină şi imunităţi"',
    },
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Senat',
      status: 'FUNCTIONAL',
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      info: 'Descarcat documentul: "Raportul Comisiei pentru administraţie publică şi amenajarea teritoriului"',
    },
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Ministerul Dezvoltarii',
      // status: 'BLOCAT',
      status: 'FUNCTIONAL',
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      // info: 'Portalul Ministerul Educatiei nu este disponibil',
      info: 'Descarcat documentul: "Strategia Națională pentru Dezvoltare Durabilă"',
    },
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Ministerul Educatiei',
      // status: 'BLOCAT',
      status: 'FUNCTIONAL',
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      // info: 'Portalul Ministerul Educatiei nu este disponibil',
      info: 'Descarcat documentul: "Strategia Națională pentru Învățarea pe Tot Parcursul Vieții"',
    },
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Ministerul Finantelor',
      // status: 'BLOCAT',
      status: 'FUNCTIONAL',
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      // info: 'Portalul Ministerul Finantelor a suferit modificari. Documentele legislative nu mai pot fi identificate',
      info: 'Descarcat documentul: "Programul Național pentru Dezvoltarea Capitalului Uman"',
    },
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Ministerul de Mediu',
      status: 'FUNCTIONAL',
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      info: 'Descarcat documentul: "Programul Național pentru Gestionarea Deșeurilor"',
    },
    {
      id: (Math.random() * 4324234).toString(),
      name: 'Ministerul Transporturilor',
      status: 'FUNCTIONAL',
      lastActivation: new Date(
        new Date().getTime() - 15 * 60 * 1000,
      ).toISOString() as unknown as Date,
      info: 'Descarcat documentul: "Proiectul de modernizare a iluminatului public în orașul Cluj"',
    },
  ];

  const state = {
    robotsStatus: [...hardcodedRobotsData],
  };

  return <RobotsStatusContext.Provider value={state}>{children}</RobotsStatusContext.Provider>;
};

export default RobotsStatusDataProvider;
