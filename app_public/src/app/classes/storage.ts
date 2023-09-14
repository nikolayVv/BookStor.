import { InjectionToken } from '@angular/core';

export const STORAGE_BROWSER = new InjectionToken<Storage>(
  'Storage browser',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);
