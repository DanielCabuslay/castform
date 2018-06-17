<template>
	<input @click="updateCheckbox" type="checkbox">
</template>

<script>
	export default {
		data() {
			return {
				isChecked: false
			}
		},
		created: function() {
			this.isChecked = this.checked;
		},
		methods: {
			setCheckbox: function() {
				
			},
			updateCheckbox: function() {
				this.isChecked = !this.isChecked;
				this.$emit('checked', this.isChecked);
			}
		}
	}
</script>

<style>
	
</style>