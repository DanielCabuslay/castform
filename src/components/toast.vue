<template>
	<aside class="toast">
		<div class="toast_message">{{ message }}</div>
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
		}
	}
</script>

<style>
	.toast {
		position: absolute;
		display: flex;
		transition: opacity 0.25s;
		text-align: center;
		background-color: white;
		border-radius: 2px;
		box-shadow: 0px 4px 20px var(--shadow);
		z-index: 6;
	}
	.toast_message {
		color: #000;
		text-shadow: none;
	}
	.toast_message {
		margin: 0.5rem;
		text-shadow: none;
    font-size: 1em;
	}
</style>