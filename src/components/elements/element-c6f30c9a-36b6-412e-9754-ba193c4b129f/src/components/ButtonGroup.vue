<template>
<div class="button-group-component" :class="{ 'vertical': layout === 'vertical' }">
<slot></slot>
</div>
</template>

<script>
export default {
name: 'ButtonGroup',
props: {
layout: {
type: String,
default: 'horizontal',
validator: value => ['horizontal', 'vertical'].includes(value)
}
}
};
</script>

<style lang="scss" scoped>
.button-group-component {
display: inline-flex;

&.vertical {
flex-direction: column;
}
}
</style>