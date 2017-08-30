export const CREATE_USER_ID = 'CREATE_USER_ID';
export function createNewUserId() {
    return {
        type: CREATE_USER_ID,
        // random number generated from 10 to 20
        id: Math.floor(Math.random() * 11) + 10
    };
}
