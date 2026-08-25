const test = require('node:test');
const assert = require('node:assert/strict');
const { getFallbackTeachers } = require('./app');

test('fallback teacher list should return teacher data', () => {
  const teachers = getFallbackTeachers();
  assert.ok(Array.isArray(teachers));
  assert.ok(teachers.length > 0);
  assert.equal(typeof teachers[0].full_name, 'string');
  assert.equal(typeof teachers[0].position, 'string');
});
