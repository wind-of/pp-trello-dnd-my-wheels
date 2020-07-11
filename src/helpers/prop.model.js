export function createPropModel(prop) {
	const event = prop ? `update:${prop}` : "input"
	return {
		set(value) {
			this.$emit(event, value);
		},
		get() {
			return this.value;
		}
	}
}