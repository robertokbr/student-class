import { useContext } from 'react';
import { ClassContext } from '../context/class-context';

export function useClass() {
  const context = useContext(ClassContext);

  if (!context) {
    throw new Error('useClass must be used within a ClassProvider');
  }

  return context;
}
