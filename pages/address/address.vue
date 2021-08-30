<template>
  <view class="address">
    <view class="address-list">
      <view v-for="(item, index) in 2" :key="index" class="g-card address-item">
        <view class="flex items-center margin-bottom-12">
          <view class="margin-right-25 font-size-16">
            张三丰
          </view>
          <view>135****0346</view>
          <view class="label">
            默认
          </view>
        </view>
        <view class="color-text-regular font-size-13 detailed-address">
          湖北省武汉市东湖高新区光谷大道金融港B2栋
          3楼中古汇科技有限公司
        </view>
        <view class="icon-edit extend-click ">
          <image class="fill-container" src="/static/images/edit.png" />
        </view>
      </view>
    </view>
    <view class="padding-top-30">
      <u-button
        class="g-btn g-btn--primary"
        type="primary"
        :ripple="false"
        hover-class="g-primary-hover"
        @click="onCreate"
      >
        添加新地址
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    onCreate () {
      console.log('onCreate')
    }
  }
}
</script>

<style lang="scss" scoped>
.address {
  padding: 10px 15px 0;
}
.address-item {
  position: relative;
  padding: 22px 15px;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
}
.icon-edit {
  position: absolute;
  right: 15px;
  bottom: 23px;
  width: 18px;
  height: 18px;
}
.detailed-address {
  line-height: 1.6;
  padding-right: 30px;
}
.label {
  width: 25px;
  height: 13px;
  line-height: 13px;
  background-color: $color-primary;
  font-size: 10px;
}
</style>
