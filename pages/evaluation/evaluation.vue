<template>
  <view>
    <view class="banner">
      <image class="fill-container" src="/static/images/evaluation-banner.png" />
    </view>
    <view class="padding-left-15 padding-right-15">
      <view class="flow-container">
        <view class="flow-item">
          <view class="flow-item__inner">
            <image class="flow-item__image flow-item__image--upload" src="/static/images/flow01.png" />
          </view>
          <text class="flow-item__label">
            上传估价
          </text>
        </view>

        <view class="flow-line">
          <image class="fill-container" src="/static/images/flow-line.png" />
        </view>

        <view class="flow-item">
          <view class="flow-item__inner">
            <image class="flow-item__image flow-item__image--send" src="/static/images/flow02.png" />
          </view>
          <text class="flow-item__label">
            寄送鉴定
          </text>
        </view>

        <view class="flow-line">
          <image class="fill-container" src="/static/images/flow-line.png" />
        </view>

        <view class="flow-item">
          <view class="flow-item__inner">
            <image class="flow-item__image flow-item__image--end" src="/static/images/flow03.png" />
          </view>
          <text class="flow-item__label">
            极速到账
          </text>
        </view>
      </view>
      <view class="category-container">
        <view class="padding-left-15 padding-right-15 margin-bottom-20">
          <view class="g-section-header">
            <view class="g-section-header-label">
              选择估价品类
            </view>
            <view class="g-section-header-more">
              <text class="margin-right-6">
                查看更多
              </text>
              <u-icon name="arrow-right" />
            </view>
          </view>
        </view>
        <view class="padding-left-10 padding-right-10 category-list">
          <view v-for="(item, index) in categoryList" :key="index" class="category-item">
            <view class="category-item-inner">
              <image class="fill-container category-item__image" :src="item.picUrl" />
              <text class="category-item__label">
                {{ item.name }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const categoryList = [
  {
    name: '名包',
    picUrl: '/static/images/category-bag.png'
  },
  {
    name: '腕表',
    picUrl: '/static/images/category-watch.png'
  },
  {
    name: '首饰',
    picUrl: '/static/images/category-jewelry.png'
  },
  {
    name: '其它',
    picUrl: '/static/images/category-other.png'
  }
]
export default {
  data () {
    return {
      categoryList
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 456rpx;
}
.flow-container {
  z-index: 2;
  position: relative;
  margin-top: -120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px 15px 35px;
  border-radius: 5px;
  background-color: #fff;
}
.flow-item {
  position: relative;
  width: 4em;
  display: flex;
  justify-content: center;
}
.flow-line {
  width: 50px;
  height: 2px;
  margin: 0 4px;
}
.flow-item__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(0deg, #121818, #404040);
  box-shadow: 0px 12px 24px 0px rgba(229, 192, 163, 0.57);
  border-radius: 50%;
}
.flow-item__image--upload {
  width: 23px;
  height: 20px;
}
.flow-item__image--send {
  width: 24px;
  height: 24px;
}
.flow-item__image--end {
  width: 23px;
  height: 22px;
}
.flow-item__label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: -25px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.category-container {
  padding-top: 18px;
  padding-bottom: 10px;
  border-radius: 5px;
  background-color: #fff;
}
.category-list {
  font-size: 0;
}
.category-item {
  display: inline-block;
  font-size: 14px;
  position: relative;
  width: 50%;
  height: 0;
  padding-bottom: 35.49%;
  margin-bottom: 10px;
  overflow: hidden;
}
.category-item-inner {
  position: absolute;
  top: 0;
  left: 5px;
  right: 5px;
  bottom: 0;
  border-radius: 5px;
  overflow: hidden;
}
.category-item__label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 28px;
  background-color: rgba(0, 0, 0, .8);
  line-height: 13px;
  font-size: 13px;
  color: #fff;
}
</style>
