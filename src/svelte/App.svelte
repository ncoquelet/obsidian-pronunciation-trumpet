<script lang="ts">
	import type { App } from "obsidian";
	import { wordreference } from "src/lib/wordreference";
	import { Accent, Word } from "src/model/word";

	//export const app: App;

	export let search: string = "this";
	let word:Word = new Word();
	let selected:Accent;
	let player: HTMLAudioElement;

	export const searchAndPlaySound = async () => {
		word = await wordreference(search, "en", "fr");

		if (word.accents.length > 0) {
			selected = word.accents[0];
		}

		playSound();
	};

	const playSound = async () => {
		player.src = selected.src;
		player
			.play()
			.catch((e) => console.error("audio play failed with: " + e));
	};
</script>

<div class="trumpet-plugin-main">
	<h4>Pronunciate</h4>

	<form on:submit|preventDefault={() => searchAndPlaySound()}>
		<input type="text" bind:value={search} />
		<button>play</button>
		<select bind:value={selected} on:change={() => playSound()}>
			{#each word.accents as accent}
				<option value={accent}>
					{accent.code}
				</option>
			{/each}
		</select>
	</form>

	<audio bind:this={player} controls />
</div>

<style>
</style>
