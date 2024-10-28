import { StateSchema } from 'app/providers/StoreProvider';
import { getRegisterUsername } from './getRegisterUsername';

describe('getRegisterUsername.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'gid',
            },
        };
        expect(getRegisterUsername(state as StateSchema)).toEqual('gid');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getRegisterUsername(state as StateSchema)).toEqual('');
    });
});
