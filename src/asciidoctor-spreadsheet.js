const reader = require('./node-reader')

function spreadsheetInlineMacro () {
  const self = this
  self.named('spreadsheet')
  self.positionalAttributes(['rownumber', 'columnnumber'])

  self.process((parent, target, attrs) => {
    const rowAttr = attrs.rownumber
    const columnAttr = attrs.columnnumber
    const separatorAttr = attrs.separator || ','
    const content = reader.read(target)
    let value = content.split('\n')[rowAttr].split(separatorAttr)[columnAttr]
    return this.createInline(parent, 'quoted', value, {})
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.inlineMacro(spreadsheetInlineMacro)
    })
  } else if (typeof registry.block === 'function') {
    registry.inlineMacro(spreadsheetInlineMacro)
  }
  return registry
}
