<template>
	<div class="dialog_area">
		<aside class="dialog">
			<section class="dialog_header">
        <i class="fas fa-cog fa-fw"></i>
				<span class="dialog_title">
        	Settings
        </span>
			</section>
			<section class="dialog_body">
				<div class="dialog_body_row">
					<div>Default City</div>
					<div>Text here</div>
				</div>
				<div class="dialog_body_row">
					<div>Show Fahrenheit</div>
					<div><input id="fahrenheit_setting" @click="updateFahrenheit" type="checkbox"></div>
				</div>
			</section>
			<section class="dialog_footer">
				<button @click="closeDialog">Close</button>
			</section>
		</aside>
	</div>
</template>

<script>
	export default {
		created: function() {
			window.onload = this.loadSettings;
		},
		methods: {
			closeDialog: function() {
				this.$emit('saved', Date.now());
				document.getElementById('settings_dialog').classList.remove('dialog_open');
			},
			loadSettings: function() {
				if (localStorage.getItem('castform-fahrenheit') == 'true') {
	        document.getElementById('fahrenheit_setting').checked = true;
	      } else {
	        document.getElementById('fahrenheit_setting').checked = false;
	      }				
			},
			updateFahrenheit: function() {
				if (document.getElementById('fahrenheit_setting').checked) {
					localStorage.setItem('castform-fahrenheit', 'true')
				} else {
					localStorage.setItem('castform-fahrenheit', 'false')					
				}
			}
		}
	}
</script>

<style>
	.dialog_area {
		position: absolute;
		display: flex;
		height: 100%;
		width: 100%;
		z-index: 5;
		background-color: var(--shadow);
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.25s, visibility 0.25s;
	}	
	.dialog {
		margin: auto;
		background-color: white;
		border-radius: 2px;
		box-shadow: 0px 4px 20px var(--shadow);
		z-index: 6;
	}
	.dialog button {
		background-color: transparent;
		transition: background-color 0.25s;
		border: 1px solid black;
		padding: 0.5em 1em;
		border-radius: 2px;
		font-family: 'Open Sans', sans-serif;
		cursor: pointer;
	}
	.dialog button:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.dialog section {
		color: black;
		text-shadow: none;
		padding: 1rem;
		text-align: center;
		border-bottom: 1px solid lightgrey;
	}
	.dialog section:first-child {
		text-align: left;
	}
	.dialog section:last-child {
		border-bottom: none;
	}
	.dialog_header {
		font-size: 24px;
		vertical-align: bottom;
	}
	.dialog_body_row {
		display: grid;
		padding: 1rem 0;
		grid-template-columns: 1fr auto;
	}
	.dialog_body_row div:first-child {
		text-align: left;
		padding-top: 0;
	}
	.dialog_body_row div:last-child {
		text-align: right;
		margin-left: 1rem;
		padding-bottom: 0;
	}
	.dialog_open {
		visibility: visible;
		opacity: 1;
	}
</style>