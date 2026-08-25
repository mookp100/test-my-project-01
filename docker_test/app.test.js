const test = require('node:test');
const assert = require('node:assert/strict');
const { getFallbackTeachers, getFallbackUsers } = require('./app');

test('fallback teacher list should return teacher data', () => {
  const teachers = getFallbackTeachers();
  assert.ok(Array.isArray(teachers));
  assert.ok(teachers.length > 0);
  assert.equal(typeof teachers[0].full_name, 'string');
  assert.equal(typeof teachers[0].position, 'string');
});

test('fallback user list should return user data', () => {
  const users = getFallbackUsers();
  assert.ok(Array.isArray(users));
  assert.ok(users.length > 0);
  assert.equal(typeof users[0].full_name, 'string');
  assert.equal(typeof users[0].email, 'string');
});
