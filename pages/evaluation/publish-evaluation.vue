<template>
  <view class="publish-evaluation">
    <view class="g-card select-control-card">
      <u-cell-group :border="false">
        <u-cell-item
          title="品类"
          arrow
          :value="form.categoryName"
          class="cell-item"
          @click="onCellItemClick('categoryVisible')"
        />
        <u-cell-item
          :border-bottom="false"
          title="品牌"
          arrow
          :value="form.brandName"
          class="cell-item"
          @click="onCellItemClick('brandVisible')"
        />
      </u-cell-group>
    </view>

    <u-select
      v-model="categoryVisible"
      :default-value="[currentCategoryIndex]"
      :list="categoryList"
      @confirm="onCategoryConfirm"
    />
    <u-picker
      v-model="brandVisible"
      mode="selector"
      :default-selector="[currentBrandIndex]"
      :range="brandList"
      range-key="name"
      @confirm="onBrandConfirm"
    />

    <view class="g-card margin-bottom-10 padding-top-18">
      <view class="padding-left-15 padding-right-15">
        <view class="g-section-header margin-bottom-15">
          <view class="g-section-header-label">
            <text>上传照片</text>
            <text class="g-section-header-tip">
              （必填）
            </text>
          </view>
        </view>
        <view class="font-size-12 color-text-secondary">
          请上传发票、证书、配件、肩带及磨损部位、瑕疵等，照片尽量清晰
        </view>
      </view>
      <view class="padding-left-10 padding-right-10">
        <u-upload
          class="upload-component"
          action="http://localhost:3000/api/upload"
          :max-count="9"
          :width="196"
          :height="196"
          show-description
          :file-list="form.picList"
          @on-success="onSuccess"
          @on-remove="onRemove"
          @description-click="onDescriptionClick"
        />
      </view>
    </view>

    <view class="g-card padding-top-18 padding-left-15 padding-right-15 padding-bottom-45">
      <view class="g-section-header margin-bottom-10">
        <view class="g-section-header-label">
          <text>备注</text>
          <text class="g-section-header-tip">
            （选填）
          </text>
        </view>
      </view>
      <u-input
        v-model="form.description"
        class="remark-textarea"
        type="textarea"
        placeholder="可以简单描述下物品的购买时间、新旧程度、购买地点等"
        :custom-style="{minHeight: '80px'}"
        :clearable="false"
      />
    </view>

    <view class="footer">
      <u-button
        class="g-btn g-btn--primary"
        type="primary"
        :ripple="false"
        hover-class="g-primary-hover"
      >
        提交
      </u-button>
    </view>
    <u-popup
      v-model="descVisible"
      mode="center"
      closeable
      width="280px"
      height="500px"
    >
      <view>
        <view class="desc-title">
          拍摄说明
        </view>
        <view class="desc-panel">
          <view
            v-for="(groupItem, groupIndex) in descData"
            :key="groupIndex"
          >
            <view class="desc-hd">
              {{ groupIndex + 1 }}. {{ groupItem.title }}
            </view>
            <view
              v-for="(item, index) in groupItem.imageList"
              :key="index"
              class="flow-item"
            >
              <view class="flow-item-inner">
                <image class="flow-item-image" :src="item.picUrl" />
                <view class="flow-item-label">
                  <view class="flow-item-label-inner">
                    {{ item.label }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import categoryList from '@/utils/data/category'
import brandData from '@/utils/data/brand'

const descData = [
  {
    title: '名包',
    imageList: [
      { label: '正面', picUrl: 'bag_one@2x.png' },
      { label: '标志或刻字', picUrl: 'bag_two@2x.png' },
      { label: '拉链或五金', picUrl: 'bag_thr@2x.png' },
      { label: '数字编号', picUrl: 'bag_four@2x.png' },
      { label: '纹路与车线', picUrl: 'bag_five@2x.png' },
      { label: '发票与保修卡', picUrl: 'bag_six@2x.png' }
    ]
  },
  {
    title: '手表',
    imageList: [
      { label: '正面', picUrl: 'swatch_one@2x.png' },
      { label: '背面', picUrl: 'swatch_two@2x.png' },
      { label: '流水码', picUrl: 'swatch_thr@2x.png' },
      { label: '侧面', picUrl: 'swatch_four@2x.png' },
      { label: '表扣与表带', picUrl: 'swatch_five@2x.png' },
      { label: '发票与保修卡', picUrl: 'swatch_six@2x.png' }
    ]
  },
  {
    title: '首饰',
    imageList: [
      { label: '正面', picUrl: 'jewelry_one@2x.png' },
      { label: '背面', picUrl: 'jewelry_two@2x.png' },
      { label: '标志或流水码', picUrl: 'jewelry_thr@2x.png' },
      { label: '侧面', picUrl: 'jewelry_four@2x.png' },
      { label: '发票与保修卡', picUrl: 'jewelry_five@2x.png' }
    ]
  },
  {
    title: '其它',
    imageList: [
      { label: '正面', picUrl: 'other_one@2x.png' },
      { label: '背面', picUrl: 'other_two@2x.png' },
      { label: '标志', picUrl: 'other_thr@2x.png' },
      { label: '侧面', picUrl: 'other_four@2x.png' },
      { label: '发票与保修卡', picUrl: 'other_fove@2x.png' }
    ]
  }
].map(item => {
  return Object.assign({}, item, {
    imageList: item.imageList.map(v => {
      return Object.assign({}, v, {
        picUrl: 'https://w-shop-1255721318.cos.ap-nanjing.myqcloud.com/' + v.picUrl
      })
    })
  })
})

export default {
  data () {
    this.brandDataCache = {}
    return {
      form: {
        categoryId: 1,
        brandId: 1,
        categoryName: '名包',
        brandName: '香奈儿',
        picList: [
          // { url: 'https://qiniu.qyhever.com/FhPK2ddCN84Y3HgQy6UCcH-IteAe' },
          // { url: 'https://test.qiniu.qyhever.com/15776095297205778615881131253' },
          // { url: 'https://test.qiniu.qyhever.com/1577609778894e4b7ded8956cb' },
          // { url: 'https://test.qiniu.qyhever.com/1577762480811f48fc10262056' },
          // { url: 'https://test.qiniu.qyhever.com/1580292629299b37be1e0ac312' }
        ],
        description: ''
      },
      categoryVisible: false,
      categoryList: categoryList.map(v => {
        return Object.assign({}, v, {
          value: v.id,
          label: v.name
        })
      }),
      brandVisible: false,
      brandList: [],
      currentCategoryIndex: 0,
      currentBrandIndex: 0,
      descVisible: false,
      descData
    }
  },
  onLoad (data) {
    this.form.categoryId = Number(data.categoryId)
    this.form.brandId = Number(data.brandId)
    this.form.categoryName = data.categoryName
    this.form.brandName = data.brandName && data.brandName.replace(/\^/g, '&') // 将 ^ 还原为 &
    this.queryBrandList()
    this.setCurrentCategoryIndex()
    this.setCurrentBrandIndex()
  },
  methods: {
    async queryBrandList () {
      if (this.brandDataCache[this.form.categoryId]) {
        this.brandList = this.brandDataCache[this.form.categoryId]
        return
      }
      const brandList = brandData[this.form.categoryId]
      const normalizedList = brandList.map(v => {
        return Object.assign({}, v, {
          value: v.id,
          label: v.name
        })
      })
      this.brandList = normalizedList
      this.brandDataCache[this.form.categoryId] = normalizedList
    },
    setCurrentCategoryIndex () {
      this.currentCategoryIndex = this.categoryList.findIndex(v => v.id === this.form.categoryId)
    },
    setCurrentBrandIndex () {
      this.currentBrandIndex = this.brandList.findIndex(v => v.id === this.form.brandId)
    },
    getCategoryName () {
      const current = this.categoryList.find(v => v.id === this.form.categoryId)
      if (!current) {
        return ''
      }
      return current.label
    },
    getBrandName () {
      const current = this.brandList.find(v => v.id === this.form.brandId)
      if (!current) {
        return ''
      }
      return current.label
    },
    async onCategoryConfirm (e) {
      console.log('onCategoryConfirm', e)
      const [item] = e
      this.form.categoryId = item.value
      this.form.categoryName = this.getCategoryName()
      this.setCurrentCategoryIndex()
      await this.queryBrandList()
      // active first item
      if (this.brandList && this.brandList[0] && this.brandList[0].id) {
        this.form.brandId = this.brandList[0].id
        this.form.brandName = this.getBrandName()
        this.setCurrentBrandIndex()
      }
    },
    onBrandConfirm (e) {
      console.log('onBrandConfirm', e)
      const [index] = e
      // this.form.brandId = item.value
      this.form.brandId = this.brandList[index].value
      this.form.brandName = this.getBrandName()
      this.setCurrentBrandIndex()
    },
    onCellItemClick (field) {
      this[field] = true
    },
    onSuccess (res) {
      console.log('onSuccess', res)
      // this.form.picList.push(res.data)
    },
    onRemove (index) {
      // const current = this.form.picList[index]
      this.form.picList.splice(index, 1)
    },
    onDescriptionClick () {
      this.descVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-evaluation {
  padding: 10px 15px 74px;
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 66px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 -7px 9px 0 rgba(156, 156, 156, 0.14);
  background-color: $color-bg-light;
  .g-btn {
    width: 100%;
    height: 45px;
    line-height: 45px;
  }
  .g-btn.g-btn--primary ::v-deep .u-btn {
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 17px;
  }
}
.select-control-card {
  margin-bottom: 10px;
  padding: 0;
  ::v-deep .u-cell {
    padding: 16px 15px;
    .u-cell_title {
      color: $color-text-primary;
    }
    .u-cell__value {
      color: $color-primary;
    }
    &:after {
      display: none;
    }
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 15px;
      right: 15px;
      height: 1px;
      background-color: #ebebeb;
      border: 0;
      transform: scaleY(0.5);
    }
  }
  .cell-item {
    &:last-of-type {
      ::v-deep .u-cell:before {
        display: none;
      }
    }
  }
}
.remark-textarea ::v-deep .u-input__textarea {
  padding: 10px;
  background-color: $color-bg;
  border-radius: 6px;
}

.desc-title {
  position: relative;
  margin-left: 18px;
  margin-top: 14px;
  padding-left: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 3px;
    height: 15px;
    background-color: #F0CEB3;
    border-radius: 2px;
  }
}
.desc-panel {
  width: 226px;
  margin: 0 auto;
}
.desc-hd {
  padding: 15px 0 10px;
}
.flow-item {
  display: inline-block;
  width: 75px;
  height: 70px;
  padding: 0 5px;
  margin-bottom: 10px;
}
.flow-item-inner {
  position: relative;
  width: 100%;
  height: 100%;
}
.flow-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.flow-item-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  background-color: rgba(0, 0, 0, .6);
  font-size: 12px;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flow-item-label-inner {
  white-space: nowrap;
  // transform: scale(0.75);
  font-size: 10px;
  text-align: center;
}
</style>
