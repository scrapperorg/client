import React from 'react';
import RobotsStatusDataProvider from './context';
import RobotsStatusContent from './components/content';

export default function RobotsStatusScreen() {
  return (
    <RobotsStatusDataProvider>
      <RobotsStatusContent />
    </RobotsStatusDataProvider>
  );
}
