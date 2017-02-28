import { addUserToGroup, getAllUsersInGroup, getCurrentUser, getCurrentUserId, updateUserLocation, getGroupMemberLocations } from '../firebase/firebaseHelpers';

describe('addUserToGroup', () => {
  it('should be a function', () => {
    expect(typeof addUserToGroup).toBe('function');
  });
});

describe('getAllUsersInGroup', () => {
  it('should be a function', () => {
    expect(typeof getAllUsersInGroup).toBe('function');
  });
});

describe('getCurrentUser', () => {
  it('should be a function', () => {
    expect(typeof getCurrentUser).toBe('function');
  });
});

describe('getCurrentUserId', () => {
  it('should be a function', () => {
    expect(typeof getCurrentUserId).toBe('function');
  });
});

describe('updateUserLocation', () => {
  it('should be a function', () => {
    expect(typeof updateUserLocation).toBe('function');
  });
});

describe('getGroupMemberLocations', () => {
  it('should be a function', () => {
    expect(typeof getGroupMemberLocations).toBe('function');
  });
  it('should accept a group name', () => {
    expect(getGroupMemberLocations.length).toEqual(1);
  });
  it('should return a promise', () => {
    expect(typeof getGroupMemberLocations('Default')).toBe('object');
  });
});
