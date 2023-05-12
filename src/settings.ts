import {App, PluginSettingTab, Setting} from 'obsidian'

import type TrumpetPlugin from "./main"

export interface TrumpetSettings {}

export class TrumpetSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: TrumpetPlugin) {
    super(app, plugin)
  }

  display(): void {
    this.containerEl.empty()

    this.containerEl.createEl("h3", {
      text: "General Settings",
    })

    this.buildSettings()
  }

  private buildSettings() {
    /** GENERAL */

  }
}