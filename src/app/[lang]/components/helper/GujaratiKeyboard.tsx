'use client';
import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

type GujaratiKeyboardProps = {
    value: string;
    onChange: (value: string) => void;
};

const gujaratiLayout = {
    default: [
        "અ આ ઇ ઈ ઉ ઊ ઋ એ ઐ ઓ ઔ ઍ ઑ {bksp}",
        "ક ખ ગ ઘ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ",
        "ત થ દ ધ ન પ ફ બ ભ મ ય ર લ",
        "વ શ ષ સ હ ળ ઁ ં ્ {space}"
    ]
};

export default function GujaratiKeyboard({ value, onChange }: GujaratiKeyboardProps) {
    return (
        <Keyboard
            onChange={(input: string) => onChange(input)}
            layout={gujaratiLayout}
            display={{
                '{bksp}': '⌫',
                '{space}': 'Space'
            }}
            inputName="gujaratiInput"
            input={value}  // sync keyboard input value with prop
        />

    );
}
