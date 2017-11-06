
export const when = function (name, fn) {
  describe('WHEN ' + name, fn)
}
export const fwhen = function (name, fn) {
  fdescribe('WHEN ' + name, fn)
}
export const xwhen = function (name, fn) {
  xdescribe('WHEN ' + name, fn)
}
export const given = function (name, fn) {
  describe('GIVEN ' + name, fn)
}
export const fgiven = function (name, fn) {
  fdescribe('GIVEN ' + name, fn)
}
export const xgiven = function (name, fn) {
  xdescribe('GIVEN ' + name, fn)
}
export const then = function (name, fn) {
  it('THEN ' + name, fn)
}
export const fthen = function (name, fn) {
  fit('THEN ' + name, fn)
}
export const xthen = function (name, fn) {
  xit('THEN ' + name, fn)
}
