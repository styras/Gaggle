import { addUserToGroup, getAllUsersInGroup, getCurrentUser, getCurrentUserId, updateUserLocation } from '../firebase/firebaseHelpers';

it('should be a function, addUserToGroup',
  () => {
    expect(typeof (addUserToGroup)).toBe('function');
  });

it('should be a function, getAllUsersInGroup',
  () => {
    expect(typeof (getAllUsersInGroup)).toBe('function');
  });

it('should be a function, getCurrentUser',
  () => {
    expect(typeof (getCurrentUser)).toBe('function');
  });

it('should be a function, getCurrentUserId',
  () => {
    expect(typeof (getCurrentUserId)).toBe('function');
  });

it('should be a function, updateUserLocation',
  () => {
    expect(typeof (updateUserLocation)).toBe('function');
  });
