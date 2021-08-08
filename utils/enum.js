/**
 * 枚举值文件
 * 每个枚举值名字带前缀 'enum'
 * 枚举值一般有两个地方使用：
 * 1、一是查询表单的 select 的列表，这时候用 enumxxx.arr
 * 2、二是根据后端返回的 enumValue 回显文案，这时候用 enumxxx.obj[enumValue]
 */

/**
 * 格式化枚举值
 * @param {Array} list 枚举值列表
 * @returns {Object} EnumAndArray {obj: {}, arr: []}
 */
function setEnumAndArray (list) {
  const obj = {}
  const arr = []
  list.forEach(item => {
    if (typeof item === 'object' && item) {
      const { value, label } = item
      arr.push({ label, value })
      obj[value] = label
    }
  })
  return {
    obj,
    arr
  }
}

export const enumOrderStatus = setEnumAndArray([
  { value: 1, label: '已下单' },
  { value: 2, label: '已付款' },
  { value: 3, label: '未付款' },
  { value: 4, label: '已发货' },
  { value: 5, label: '已收货' }
])

export const enumCategoryList = setEnumAndArray([
  { value: 1, label: '精选' },
  { value: 2, label: '名包' },
  { value: 3, label: '手表' },
  { value: 4, label: '黄金' },
  { value: 5, label: '汽车' }
])
