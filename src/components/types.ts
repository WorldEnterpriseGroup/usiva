export type ActionTone = 'primary' | 'gold' | 'outline' | 'light';

export interface Action {
  label: string;
  href: string;
  tone: ActionTone;
  external?: boolean;
}

export interface PathwayItem {
  label: string;
  detail: string;
}
