<template>
  <view class="my">
    <view class="banner">
      <image class="fill-container" src="/static/images/my-banner.png" />
    </view>
    <view class="main">
      <view class="flex items-center user">
        <view class="avatar">
          <image class="fill-container" src="/static/images/avatar.png" />
        </view>
        <text class="flex-grow font-size-20 color-text-white">
          135****0346
        </text>
      </view>
      <view class="flex margin-bottom-10">
        <view class="g-card flex-grow flex margin-right-10 padding-15">
          <view class="flex-grow margin-top-6">
            <view class="font-size-15 margin-bottom-6">
              我的估价
            </view>
            <view class="font-size-12 color-text-placeholder">
              安全正规
            </view>
          </view>
          <view class="quick-image">
            <image class="fill-container" src="/static/images/personal-eval.png" />
          </view>
        </view>
        <view class="g-card flex-grow flex padding-15">
          <view class="flex-grow margin-top-6">
            <view class="font-size-15 margin-bottom-6">
              分享
            </view>
            <view class="font-size-12 color-text-placeholder">
              名品分享给好友
            </view>
          </view>
          <view class="quick-image">
            <image class="fill-container" src="/static/images/personal-share.png" />
          </view>
        </view>
      </view>

      <view class=" margin-bottom-10 padding-top-18 padding-bottom-26 g-card">
        <view class="padding-left-15 padding-right-15 margin-bottom-25">
          <view class="g-section-header">
            <view class="g-section-header-label">
              我的订单
            </view>
            <view class="g-section-header-more">
              <text class="margin-right-6">
                全部订单
              </text>
              <u-icon name="arrow-right" />
            </view>
          </view>
        </view>
        <view class="flex menu-list">
          <view v-for="(item, index) in myOrderList" :key="index" class="menu-item">
            <view class="menu-item__image">
              <image class="fill-container" :src="item.picUrl" />
            </view>
            <view class="menu-item__label">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>

      <view class=" padding-top-18 padding-bottom-26 g-card">
        <view class="padding-left-15 padding-right-15 margin-bottom-25">
          <view class="g-section-header">
            <view class="g-section-header-label">
              常用服务
            </view>
          </view>
        </view>
        <view class="flex menu-list">
          <view
            v-for="(item, index) in commonServiceList"
            :key="index"
            class="menu-item"
            @click="onMenuItemClick(item.value)"
          >
            <view class="menu-item__image">
              <image class="fill-container" :src="item.picUrl" />
            </view>
            <view class="menu-item__label">
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const myOrderList = [
  {
    name: '待付款',
    picUrl: '/static/images/order-status-await-pay.png'
  },
  {
    name: '待发货',
    picUrl: '/static/images/order-status-await-delivery.png'
  },
  {
    name: '待收货',
    picUrl: '/static/images/order-status-await-receive.png'
  },
  {
    name: '已完成',
    picUrl: '/static/images/order-status-already-complete.png'
  }
]
const commonServiceList = [
  {
    name: '地址管理',
    value: 'address',
    picUrl: '/static/images/common-location.png'
  },
  {
    name: '联系客服',
    value: 'contact',
    picUrl: '/static/images/common-message.png'
  },
  {
    name: '常见问题',
    value: 'question',
    picUrl: '/static/images/common-question.png'
  },
  {
    name: '设置',
    value: 'setting',
    picUrl: '/static/images/common-setting.png'
  }
]
export default {
  data () {
    return {
      myOrderList,
      commonServiceList
    }
  },
  methods: {
    onMenuItemClick (val) {
      if (val === 'setting') {
        wx.navigateTo({
          url: '/pages/setting/setting'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
  padding-top: 64px;
}
.banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 416rpx;
}
.main {
  z-index: 1;
  position: relative;
  padding: 0 15px;
}
.user {
  padding: 40rpx 0 48rpx;
}
.avatar {
  flex: 0 0 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}
.quick-image {
  flex: 0 0 51px;
  height: 51px;
}
.menu-list {
  display: flex;
  justify-content: space-between;
  padding: 0 28px;
}
.menu-item {
  width: 4em;
}
.menu-item__image {
  width: 26px;
  height: 26px;
  margin: 0 auto 10px;
}
.menu-item__label {
  color: $color-text-regular;
  font-size: 13px;
  text-align: center;
}
</style>
