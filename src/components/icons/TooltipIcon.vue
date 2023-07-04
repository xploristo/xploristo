<script>
export default {
  name: 'TooltipIcon',
  props: {
    text: { type: String, required: true },
    left: { type: String, default: '-141%' },
    width: { type: String, default: '400%' },
  },
};
</script>

<template>
  <div class="group cursor-pointer relative inline-block text-center">
    <slot></slot>

    <div class="icon-tooltip" :style="{ left, width }">
      {{ text }}
      <svg
        class="absolute text-black h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  </div>
</template>
