const { CompositeDisposable } = require('atom')

module.exports = {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bsingleton-ascii-art:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const selection = editor.getSelectedText()

      const figlet = require('figlet')
      const font = 'O8'
      figlet(selection, {font}, function(error, art) {
        if (error) {
          console.error(error)
        } else {
          editor.insertText(`\n${art}\n`)
        }
      })
    }
  }
};
