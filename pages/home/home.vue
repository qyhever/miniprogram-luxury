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
        <image class="banner-image" src="/static/images/banner.png" />
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

    <view class="list">
      <view
        v-for="(item, index) in 6"
        :key="index"
        class="u-border-bottom item"
      >
        <view class="item__hd" />
        <view class="item__bd" />
      </view>
    </view>
  </view>
</template>

<script>
import { enumCategoryList } from '@/utils/enum'
export default {
  data () {
    return {
      tabList: enumCategoryList.arr,
      current: 0
    }
  },
  onLoad () {
    console.log('onLoad')
  },
  methods: {
    onTabChange (index) {
      this.current = index
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
.list {

}
.item {
  padding: 15px;
  background-color: #fff;
}
.item__hd {
  flex: 0 0 100px;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
}
.item__bd {
  flex: 1;
  margin-left: 20px;
}
</style>
