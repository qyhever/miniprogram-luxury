<template>
  <view class="flex panel">
    <scroll-view class="aside" scroll-y>
      <view
        v-for="(item, index) in categoryList"
        :key="index"
        class="category-item"
        :class="{active: activeCategoryId === item.id}"
        @click="onCategoryItemClick(item)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
    <view class="main">
      <view class="banner">
        <view class="banner-inner">
          <image
            v-if="activeCategory && activeCategory.pic"
            class="fill-container"
            :src="activeCategory.pic"
            mode="aspectFill"
          />
        </view>
      </view>

      <u-index-list :scroll-top="scrollTop" :sticky="false" :index-list="indexList">
        <view v-for="(item, index) in brandList" :key="index" class="brand-item-group">
          <u-index-anchor class="index-anchor" :index="item.initials" use-slot>
            <view>{{ item.initials === '热' ? '热门品牌' : item.initials }}</view>
          </u-index-anchor>
          <view class="item-body">
            <view
              v-for="(brandItem, brandIndex) in item.data"
              :key="brandIndex"
              class="brand-item-cell"
              @click="onCellItemClick(brandItem)"
            >
              <view class="brand-item-image-wrapper">
                <image class="fill-container" :src="brandItem.logo" />
              </view>
              <view class="brand-item-text">
                {{ brandItem.name }}
              </view>
            </view>
          </view>
        </view>
      </u-index-list>
    </view>
  </view>
</template>

<script>
// u-index-list bug: scrollToAnchor anchor.top -> Math.ceil(anchor.top)
import categoryList from '@/utils/data/category'
import brandData from '@/utils/data/brand'
import { normalizeBrandList } from '@/utils'
export default {
  data () {
    this.brandCacheData = {}
    return {
      scrollTop: 0,
      categoryList,
      activeCategoryId: 1,
      brandList: []
    }
  },
  computed: {
    indexList () {
      return this.brandList.map(v => v.initials)
    },
    activeCategory () {
      return this.categoryList.find(v => v.id === this.activeCategoryId)
    }
  },
  onLoad (params) {
    const { id } = params
    if (id) {
      this.activeCategoryId = Number(id)
    }
  },
  created () {
    this.setBrandList()
  },
  onPageScroll (e) {
    this.scrollTop = e.scrollTop
  },
  methods: {
    onCategoryItemClick ({ id }) {
      if (this.activeCategoryId !== id) {
        this.activeCategoryId = id
        this.setBrandList()
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      }
    },
    setBrandList () {
      if (this.brandCacheData[this.activeCategoryId]) {
        this.brandList = this.brandCacheData[this.activeCategoryId]
        return
      }
      const brandList = brandData[this.activeCategoryId]
      const popularBrandList = brandList
        .filter(v => v.popular === 1)
        .map(v => {
          return Object.assign({}, v, {
            initials: '热'
          })
        })
      const normalizedList = normalizeBrandList(popularBrandList.concat(brandList))
      this.brandList = normalizedList
      this.brandCacheData[this.activeCategoryId] = normalizedList
    },
    onCellItemClick (row) {
      const params = {
        categoryId: this.activeCategoryId,
        // 将 名字中的 & 替换，避免传参错误
        categoryName: this.activeCategory.name.replace(/&/g, '^'),
        brandId: row.id,
        brandName: row.name,
        brandLogo: row.logo
      }
      wx.navigateTo({
        url: '/pages/evaluation/publish-evaluation' + this.$u.queryParams(params)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  padding-top: 10px;
  padding-right: 15px;
}
.aside {
  position: fixed;
  top: 10px;
  left: 0;
  bottom: 0;
  width: 98px;
  border-radius: 0 6px 0 0;
  background-color: $color-bg-light;
}
.category-item {
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: $color-bg-light;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 5px;
    height: 20px;
    border-radius: 3px;
    background-color: $color-primary;
    opacity: 0;
    transition: opacity .3s ease-in-out;
  }
  &.active {
    background-color: $color-bg;
    color: $color-primary;
    &:before {
      opacity: 1;
    }
  }
}
.main {
  flex-grow: 1;
  margin-left: 108px;
}
.banner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 32.14%;
  margin-bottom: 10px;
}
.banner-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
  overflow: hidden;
}
.brand-item-group {
  margin-bottom: 10px;
  background-color: $color-bg-light;
  border-radius: 0 0 6px 6px;
}
.main .index-anchor {
  ::v-deep .u-index-anchor {
    position: relative;
    padding: 10px 14px;
    background-color: $color-bg-light;
    border-radius: 6px 6px 0 0;
    font-weight: 700;
    &:after {
      content: "";
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 0;
      height: 1px;
      background-color: #ddd;
      transform: scaleY(0.5);
    }
  }
}
.item-body {
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
}
.brand-item-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 33.33%;
  margin-bottom: 15px;
}
.brand-item-image-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 2px;
  overflow: hidden;
}
.brand-item-text {
  width: 100%;
  padding: 8px 6px 0;
  font-size: 12px;
  color: #666;
  text-align: center;
  word-break: break-all;
}
</style>
