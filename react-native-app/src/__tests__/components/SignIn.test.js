import React from 'react';
import { SignInContainer } from '../../components/SignIn';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls function provided by onSubmit prop after pressing the submit button', async () => {
            const onSubmit = jest.fn();
            
            const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

            const username = getByTestId("username");
            const password = getByTestId("password");
            const button = getByTestId("button");

            fireEvent.changeText(username, 'kalle');
            fireEvent.changeText(password, 'password');
            fireEvent.press(button);

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            });
        });
    });
});