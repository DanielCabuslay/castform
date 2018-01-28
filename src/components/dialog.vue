<template>
	<aside id="error_dialog">
		<div class="dialog">
			<!-- <h2>{{ header }}</h2> -->
			<div class="dialog_message">{{ message }}</div>
			<div class="dialog_action">
				<button @click="closeDialog">OK</button>
			</div>
		</div>
	</aside>
</template>

<script>
	export default {
		props: ['message'],
		data() {
			return {
			}
		},
		watch: {
			errorMessage: function() {
				this.message = message;
			}
		},
		methods: {
			closeDialog: function() {
				document.getElementById('error_dialog').style.opacity = '0';
				document.getElementById('error_dialog').style.visibility = 'hidden';
			}
		}
	}
</script>

<style>
	aside {
		position: absolute;
		display: flex;
		transition: opacity 0.25s;
		top: 56px;
		right: 1rem;
	}
	#error_dialog {
		visibility: hidden;
		opacity: 0;
	}
	.dialog {
		text-align: center;
		background-color: rgba(255, 255, 255, 0.9);
		display: grid;
		grid-template-columns: 1fr auto;
		border-radius: 2px;
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
	}
	.dialog h2, .dialog_message {
		color: #000;
		text-shadow: none;
	}
	.dialog h2 {
		margin-bottom: 0.5rem;
		text-transform: capitalize;
	}
	.dialog_message, .dialog_action button {
		margin: 0.5rem;
		text-shadow: none;
    font-size: 1em;
	}
	.dialog_action button {
		color: #0066DB;
    border: none;
    background: transparent;
    font-family: inherit;
    cursor: pointer;
    vertical-align: text-top;
	}
</style>