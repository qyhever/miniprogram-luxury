<template>
  <view class="setting">
    <u-cell-group :border="false" class="cell-group">
      <u-cell-item title="关于我们" arrow bg-color="#fff" />
    </u-cell-group>

    <view class="margin-top-30 btn--logout">
      <u-button :ripple="false" hover-class="hover-class-gray">
        退出登录
      </u-button>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.setting {
  padding: 15px 15px 0;
  ::v-deep .u-cell-item-box {
    border-radius: 4px;
    overflow: hidden;
  }
  ::v-deep .u-cell {
    padding-top: 18px;
    padding-bottom: 18px;
    line-height: 28rpx;
    &:after {
      display: none;
    }
  }
  ::v-deep .u-cell__left-icon-wrap {
    height: 28rpx;
  }
}
.btn--logout {
  ::v-deep .u-btn.u-btn--default {
    height: 45px;
    line-height: 45px;
    border-radius: 3px;
    font-size: 17px;
    &:after {
      display: none;
    }
  }
}
</style>
