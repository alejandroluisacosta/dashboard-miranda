import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import 'jest-environment-jsdom';
import Button from "./Button";

test('Color has to be "var(--lighter-green)" if $isEditing prop is true', () => {
    
    const { getByText } = render(
        <div>
            <Button $isEditing={true} content='test button'>
            </Button>
        </div>
    )

    const buttonComponent = getByText('test button');
    const style = window.getComputedStyle(buttonComponent);

    expect(style.backgroundColor).toBe('rgb(0, 0, 0)');

});