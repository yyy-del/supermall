import { debouncd } from './utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        //监听总线：图片加载完成
        this.refresh = debouncd(this.$refs.scroll.refresh, 500);
        this.itemImgListener = () => {
            this.refresh();

        };
        this.$bus.$on("itemImgLoad", this.itemImgListener);
    }
}