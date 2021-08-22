<template>
  <view class="flex flex-column page">
    <uni-nav-bar
      class="g-nav-bar"
      title="首页"
      fixed
      status-bar
      color="#ffffff"
      background-color="#2D2B2B"
    />
    <view class="header">
      <view class="banner">
        <image class="banner-image" src="/static/images/home-banner.png" />
      </view>
      <view class="u-flex u-border-bottom tabs-container">
        <u-tabs
          class="u-flex-1 tabs"
          :list="tabList"
          :is-scroll="false"
          :current="current"
          name="label"
          bar-width="60"
          inactive-color="#333"
          active-color="#e5c0a3"
          @change="onTabChange"
        />
        <navigator class="u-flex u-row-center more-link" url="/pages/my/my">
          更多
        </navigator>
      </view>
    </view>

    <scroll-view
      class="scroll-list"
      scroll-y
      enable-back-to-top
      refresher-enabled
      :refresher-triggered="refresherTriggered"
      :lower-threshold="100"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scrolltolower="onScrolltolower"
    >
      <view
        v-for="(item, index) in goodsList"
        :key="index"
        class="border-bottom flex goods-item"
        :class="{ last: index === goodsList.length - 1 }"
      >
        <view class="item-hd">
          <image class="fill-container" src="/static/images/goods.png" />
        </view>
        <view class="flex flex-column justify-between item-bd">
          <view>
            <view class="margin-bottom-6 font-size-15">
              GUCCI古驰经典女包
            </view>
            <view class="flex">
              <view class="g-label">
                平台现货
              </view>
              <view class="g-label">
                9成新
              </view>
            </view>
          </view>
          <view>
            <text class="font-bold">
              ￥
            </text>
            <text class="margin-left-4 margin-right-6 font-size-24 font-bold">
              8999
            </text>
            <text class="line-through color-text-secondary font-size-12">
              ￥12999
            </text>
          </view>
          <view class="flex flex-column items-center item-nook">
            <view class="margin-bottom-2 font-size-10 color-text-secondary">
              1239人围观
            </view>
            <u-button
              class="g-btn g-btn--primary"
              type="primary"
              :ripple="false"
              hover-class="g-primary-hover"
            >
              抢购
            </u-button>
          </view>
        </view>
      </view>
      <view
        class="flex justify-center items-center padding-top-10 padding-bottom-10"
      >
        <u-loadmore :status="loadStatus" bg-color="#f6f6f6" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { enumCategoryList } from '@/utils/enum'
import { getDiscList } from '@/api'
export default {
  data () {
    return {
      tabList: enumCategoryList.arr,
      current: 0,
      paper: {
        page: 1,
        size: 10
      },
      total: 0,
      goodsList: [],
      refresherTriggered: true,
      loadStatus: 'loading'
    }
  },
  onLoad () {
    this.query()
  },
  methods: {
    onTabChange (index) {
      this.current = index
    },
    async query () {
      this.loadStatus = 'loading'
      try {
        const res = await getDiscList({
          page: this.paper.page,
          size: 10
        })
        console.log('res', res)
        const list = res.list || []
        const total = res.total || 0
        if (this.paper.page === 1) {
          this.goodsList = list
        } else {
          this.goodsList = this.goodsList.concat(list)
        }
        this.total = total
        this.loadStatus = total === this.goodsList.length ? 'nomore' : 'loadmore'
      } catch (err) {
        console.log('err', err)
      }
    },
    async onRefresh () {
      console.log('onRefresh')
      this.paper.page = 1
      this.loadStatus = 'loadmore'
      await this.query()
      this.refresherTriggered = false
    },
    onRestore () {
      console.log('onRestore')
      this.refresherTriggered = 'restore'
    },
    onScrolltolower () {
      console.log('onScrolltolower')
      if (this.loadStatus === 'loading') {
        return
      }
      if (this.loadStatus === 'nomore') {
        return
      }
      this.paper.page += 1
      this.query()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  // height: 100vh;
  // overflow: hidden;
}
.header {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 144rpx;
    border-radius: 0 0 50% 50%;
    background-color: #2D2B2B;
  }
}
.banner {
  z-index: 2;
  position: relative;
  height: 292rpx;
  margin-top: 10px;
  padding: 0 15px 0;
}
.banner-image {
  width: 100%;
  height: 100%;
}
.tabs-container {
  padding: 0 10px;
  background-color: #fff;
  ::v-deep .u-tab-item {
    font-size: 13px !important;
  }
}
.more-link {
  flex: 0 0 16.67%;
  width: 16.67%;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  color: $color-text-secondary;
}
.goods-item {
  padding: 15px;
  background-color: #fff;
  &.last {
    &:after {
      display: none;
    }
  }
  &:after {
    left: 15px;
    right: 15px;
  }
}
.item-hd {
  flex: 0 0 100px;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
}
.item-bd {
  position: relative;
  flex: 1;
  margin-left: 20px;
}
.item-nook {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
.scroll-list {
  position: fixed;
  top:  calc(292rpx + 50px + 44px + 20px);
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
