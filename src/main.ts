import {Plugin, Editor, MarkdownView, Notice} from 'obsidian'

import {TRUMPET_VIEW_TYPE} from './constants'
import {TrumpetSettings, TrumpetSettingTab} from './settings'
import TrumpetView from './view'

export default class TrumpetPlugin extends Plugin {
    
  private settings: TrumpetSettings

  get view() {
    return this.app.workspace.getLeavesOfType(TRUMPET_VIEW_TYPE)[0]?.view as TrumpetView
  }

  async onload() {
    await this.loadSettings()

    this.addSettingTab(new TrumpetSettingTab(this.app, this))

    this.addCommand({
        id: 'pronunciate-selected-word',
        name: 'Pronunciate selected word',
        editorCallback: (editor: Editor, view: MarkdownView) => {
            new Notice('Let\'s play : ' + editor.getSelection());
            this.view.playSound(editor.getSelection());
            
        }
    });
    this.registerView(TRUMPET_VIEW_TYPE, (leaf) => {
      const newView = new TrumpetView(leaf, this)
      return newView
    })

    if (this.app.workspace.layoutReady) this.initLeaf()
    else this.app.workspace.onLayoutReady(() => this.initLeaf())
  }

  initLeaf(): void {
    if (this.app.workspace.getLeavesOfType(TRUMPET_VIEW_TYPE).length) return

    this.app.workspace.getRightLeaf(false).setViewState({
      type: TRUMPET_VIEW_TYPE,
      active: true,
    })
  }

  async onunload() {
  }

  async loadSettings() {
    const loadedData = await this.loadData()
    this.settings = { ...loadedData }
  }

  async saveSettings() {
    await this.saveData(this.settings);
}

async activateView() {
    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(TRUMPET_VIEW_TYPE)[0]
    );
  }

}