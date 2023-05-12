<script lang="ts">

	import type { App } from "obsidian";

	import wordreference from "wordref";

	//export const app: App;

	export let word: string = "this";
	let accents = [];
	let selected;
	let player;

	export const searchAndPlaySound = async () => {
		wordreference(word, "en", "fr", (result) => {
			//audio/en/uk/general/en083718.mp3
			accents = result.audio.map((element) => {
				let code = element
					.match(/\/audio\/en\/(.*)\/.*\.mp3/)[1]
					.replace("/", "-")
					.toUpperCase();
				return { code: code, src: element };
			});

			selected = accents[0];

			playSound();
		});
	};

	const playSound = async () => {
		player.src = "http://www.wordreference.com" + selected.src;
		player
			.play()
			.catch((e) => console.error("audio play failed with: " + e));
	};
</script>

<div class="trumpet-plugin-main">
	<h4>Pronunciate</h4>

	<form on:submit|preventDefault={() => searchAndPlaySound()}>
		<input type="text" bind:value={word} />
		<button>play</button>
		<select bind:value={selected} on:change={() => playSound()}>
			{#each accents as accent}
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
