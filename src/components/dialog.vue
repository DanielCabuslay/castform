<template>
	<aside>
		<div class="dialog">
			<h2>{{ header }}</h2>
			<div class="dialog_message">{{ message }}</div>
			<div><!--button row--></div>
		</div>
	</aside>
</template>

<script>
	export default {
		data() {
			return {
				header: 'Title',
				message: 'Message'
			}
		},
		methods: {
			setTitle: function(title) {
				this.title = title;
			},
			setMessage: function(message) {
				this.message = message;
			}
		}
	}
</script>

<style>
	aside {
		position: absolute;
		height: 100vh;
		width: 100vw;
		display: flex;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.25s;
	}
	.dialog {
		margin: auto;
		text-align: center;
		max-width: 400px;
		min-width: 200px;
		background-color: rgba(255, 255, 255, 0.9);
		display: grid;
		border-radius: 4px;
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
	.dialog_message {
		margin: 1rem;
	}
</style>