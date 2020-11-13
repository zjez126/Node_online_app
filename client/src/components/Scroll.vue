<template>
<div class="scroll-wrap" ref="wrapper">
    <div>
        <!--下拉刷新-->
        <div class="pulldown" v-show="dragTip.showLoading">
            <div class="clear">
                <div class="fl">
                    <img width="16" src="../assets/scroll_load.gif" alt="">
                    <div class="fl">{{dragTip.text}}</div>
                </div>
            </div>
        </div>
        <slot></slot>
        <!--上拉加载-->
        <div class="pullup">
            <div class="clear" v-if="!isDone">
                <div class="fl">
                    <img width="16" src="../assets/scroll_load.gif" alt="">
                    <div class="fl">加载中...</div>
                </div>
            </div>
            <div class="list-donetip" v-else>
                <slot name="doneTip">没有更多数据</slot>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'scroll',
    data() {
        return {
            scroll: {},
            dragTip: {
                text: '下拉刷新',
                showLoading: false
            },
            isDone: false
        }
    },

    methods: {
        initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: 1
            })

            //派发下拉事件

            this.scroll.on("scroll", pos => {
                //显示下拉刷新loading
                this.dragTip.showLoading = true;
                if (pos.y > 50) {
                    this.dragTip.text = "释放刷新"
                }
            });

            //手松开事件
            this.scroll.on("touchEnd", pos => {
                if (pos.y > 50) {
                    this.dragTip.text = "刷新中";

                    this.$emit("pulldown");
                    this.$on("refresh", this.reset)
                }
            })
            //派发滚动到底部事件，用于上拉加载
            this.scroll.on("scrollEnd", () => {
                if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                    //注册下拉事件
                    this.$emit("pullup");
                    //触发事件
                    this.$on("loadedDone", () => {
                        this.isDone = true
                    })
                }
            })

        },
        reset() {
            this.isDone = false;
            setTimeout(() => {
                this.dragTip = {
                    text: '下拉刷新',
                    showLoading: false
                }
            }, 600);
        }
    },
    mounted() {
        setTimeout(() => {
            this.initScroll();
        }, 20)
    },
}
</script>

<style scoped>
.scroll-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.fl {
    display: inline-block;
}

.fl img {
    vertical-align: middle;
    margin-right: 0.2rem;
}

/* 下拉刷新 */
.pulldown,
.pullup {
    width: 100%;
    height: 40px;
    position: relative;
    color: #888;
}

.clear {
    padding: 10px 0px;
    font-size: 0.28rem;
    position: absolute;
    left: 50%;
    top: 5px;
    transform: translate(-50%, 0);
}

.list-donetip {
    text-align: center;
    line-height: 50px;
    font-size: 0.28rem;
}
</style>
