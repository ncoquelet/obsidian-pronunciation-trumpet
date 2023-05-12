import { ItemView, WorkspaceLeaf } from "obsidian";

import { TRUMPET_VIEW_TYPE } from "./constants";
import App from "./svelte/App.svelte";

import type TrumpetPlugin from "./main";

export default class TrumpetView extends ItemView {
	private _app: App;
	private lastRerender = 0;
	private searchTerm = "";

	constructor(leaf: WorkspaceLeaf, private plugin: TrumpetPlugin) {
		super(leaf);
	}

	getViewType(): string {
		return TRUMPET_VIEW_TYPE;
	}

	getDisplayText(): string {
		return "Trumpet";
	}

	getIcon(): string {
		return "megaphone";
	}

	async playSound(word: string) {
		this._app.$set({ word: word });
		this._app.searchAndPlaySound();
	}

	async onClose() {
		this._app.$destroy();
	}

	async onOpen(): Promise<void> {
		this._app = new App({
			target: (this as any).contentEl,
			props: this.props(),
		});
		this.refresh();
	}

	async refresh(all = false) {
		if (all) {
			this.lastRerender = 0;
		}
		this.renderView();
		this.lastRerender = +new Date();
	}

	rerender() {
		this.renderView();
	}

	private props() {
		return {
			app: this.app,
		};
	}

	private renderView() {
		this._app.$set(this.props());
	}
}
