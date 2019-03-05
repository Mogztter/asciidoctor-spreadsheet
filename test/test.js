/* global describe it */
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')

chai.use(dirtyChai)

const asciidoctorSpreadsheet = require('../src/asciidoctor-spreadsheet.js')
const asciidoctor = require('asciidoctor.js')()

describe('Registration', () => {
  it('should register the extension', () => {
    const registry = asciidoctor.Extensions.create()
    expect(registry['$inline_macros?']()).to.be.false()
    asciidoctorSpreadsheet.register(registry)
    expect(registry['$inline_macros?']()).to.be.true()
    expect(registry['$registered_for_inline_macro?']('spreadsheet')).to.be.an('object')
  })
})

describe('Conversion', () => {
  describe('When extension is not registered', () => {
    it('should not convert an existing spreadsheet', () => {
      const input = `spreadsheet:${__dirname}/test.csv[2,2]`
      const html = asciidoctor.convert(input)
      expect(html).to.contain(input)
    })
  })
  describe('When extension is registered', () => {
    it('should get the spreadsheet value at row 3 and column 2', () => {
      const input = `spreadsheet:${__dirname}/test.csv[3,2]`
      const registry = asciidoctor.Extensions.create()
      asciidoctorSpreadsheet.register(registry)
      const html = asciidoctor.convert(input, { extension_registry: registry })
      expect(html).to.contain('235')
    })
  })
})
