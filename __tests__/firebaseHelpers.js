import { addUserToGroup, getAllUsersInGroup } from '../firebase/firebaseHelpers';

it('should be a function, addUserToGroup',
  () => {
    expect(typeof (addUserToGroup)).toBe('function');
  });

it('should be a function, getAllUsersInGroup',
  () => {
    expect(typeof (getAllUsersInGroup)).toBe('function');
  });
