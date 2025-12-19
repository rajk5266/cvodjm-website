// src/types/react-simple-keyboard.d.ts
declare module 'react-simple-keyboard' {
  import * as React from 'react';

  export interface KeyboardProps {
    // common props you'll use — keep flexible
    onChange?: (input: string) => void;
    onKeyPress?: (button: string) => void;
    layout?: any;
    display?: Record<string,string>;
    theme?: string;
    maxLength?: number;
    mergeDisplay?: boolean;
    [key: string]: any; // allow other props
  }

  export default class Keyboard extends React.Component<KeyboardProps, any> {}
}
