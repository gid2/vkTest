import { StateSchema } from 'app/providers/StoreProvider';
import { getRegisterPassword } from './getRegisterPassword';

describe('getRegisterPassword.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '123',
            },
        };
        expect(getRegisterPassword(state as StateSchema)).toEqual('123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getRegisterPassword(state as StateSchema)).toEqual('');
    });
});
