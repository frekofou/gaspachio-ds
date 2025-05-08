<template>
    <div class="ww-image" :class="{ '-can-drag-image': isDoubleSelected && !isMoving }" v-on="dragListener">
        <div class="ww-image__wrapper" :style="formatStyle" ww-responsive="ww-img-wrap">
            <div class="ww-image__ratio" :style="ratioStyle" ww-responsive="ww-img-ratio"></div>
            <img
                draggable="false"
                class="ww-image__img"
                :src="src"
                :alt="wwLang.getText(content.alt)"
                :style="imageStyle"
                ww-responsive="ww-img"
                @load="setRatio"
            />
        </div>
    </div>
</template>
<script>
export default {
    inject: {
        componentStyle: { default: () => {} },
    },
    props: {
        content: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['update:content'],
    data() {
        return {
            wwLang: wwLib.wwLang,
            dragListener: {},
        };
    },
    computed: {
        url() {
            const url = this.wwElementState.props.url || this.content.url || '';
            return typeof url === 'string' ? url : '';
        },
        imageStyle() {
            let style = {
                filter:
                    this.content && this.content.style && this.content.style.filter ? this.content.style.filter : null,
                '--zoom': (this.content && this.content.zoom) || 1,
                '--left': (this.content && this.content.x) || 0,
                '--top': (this.content && this.content.y) || 0,
                transition: this.componentStyle.transition,
            };
            return style;
        },
        formatStyle() {
            const overlayBackground = (this.content.style && this.content.style.overlay) || 'none';
            return {
                '--ww-image-overlay-background': overlayBackground,
            };
        },
        ratioStyle() {
            if (!this.componentStyle.height || this.componentStyle.height === 'auto') {
                return {
                    '--ww-image-ratio': `${this.content.ratio * 100}%`,
                };
            } else {
                return {
                    '--ww-image-ratio': '0%',
                };
            }
        },
        isDoubleSelected() {
            // eslint-disable-next-line no-unreachable
            return false;
        },
        isWeWeb() {
            return this.url.startsWith('designs/');
        },
        src() {
            return this.isWeWeb ? `${wwLib.wwUtils.getCdnPrefix()}${this.url}` : this.url;
        },
    },
    methods: {
        setRatio() {
        },
    },
};
</script>
<style scoped lang="scss">
.ww-image {
    display: flex;
    position: relative;
    overflow: hidden;
    &__wrapper {
        width: 100%;
        position: relative;
        overflow: hidden;
        flex: 1;
        &:after {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--ww-image-overlay-background);
            pointer-events: none;
        }
    }
    &__ratio {
        visibility: hidden;
        position: relative;
        pointer-events: none;
        &:before {
            content: '';
            width: 1px;
            margin-left: -1px;
            float: left;
            height: 0;
            padding-top: var(--ww-image-ratio);
        }
        &:after {
            content: '';
            display: table;
            clear: both;
        }
    }
    &__img {
        position: absolute;
        --posX: calc(calc(1% * var(--left)) * calc(1 - calc(calc(1 - var(--zoom)) / 2)));
        --posY: calc(calc(1% * var(--top)) * calc(1 - calc(calc(1 - var(--zoom)) / 2)));
        top: calc(50% + var(--posY));
        left: calc(50% + var(--posX));
        width: calc(100% * var(--zoom));
        transform: translate(-50%, -50%);
        image-rendering: -webkit-optimize-contrast;
        &-picture {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
}
</style>
<style lang="scss">
</style>
