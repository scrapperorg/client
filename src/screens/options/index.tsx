import React from 'react';
import OptionsDataProvider from './context';
import OptionsContent from './components/content';

export default function OptionsScreen() {
  return (
    <OptionsDataProvider>
      <OptionsContent />
    </OptionsDataProvider>
  );
}
