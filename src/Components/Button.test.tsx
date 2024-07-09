import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import 'jest-environment-jsdom';
import Button from "./Button";

test('Background color has to be rgb(0, 0, 0) if $isEditing prop is true', () => {
    
    const { getByText } = render(
        <div>
            <Button $isEditing content='test button'>
            </Button>
        </div>
    )

    const buttonComponent = getByText('test button');
    const style = window.getComputedStyle(buttonComponent);

    expect(style.backgroundColor).toBe('rgb(0, 0, 0)');
});

test('Background color has to be rgb(235, 241, 239) if $isEditing prop is false', () => {
    
    const { getByText } = render(
        <div>
            <Button $isEditing={false} content='test button'>
            </Button>
        </div>
    )

    const buttonComponent = getByText('test button');
    const style = window.getComputedStyle(buttonComponent);

    expect(style.backgroundColor).toBe('rgb(235, 241, 239)');
});