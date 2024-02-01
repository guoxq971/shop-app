<!--首页-->
<template>
  <view class="share-layout">
    <!--顶部导航栏-->
    <bmNavbar />

    <view class="body-wrap">
      <!--广告-->
      <Advertised height="100rpx" :src="advertisedList[1].url"></Advertised>

      <!--分类-->
      <view class="category-wrap">
        <view class="title">Shop Your Favorite League</view>
        <view class="list">
          <view class="item-container" v-for="item in categoryList" :key="item.id">
            <VanImage class="item-head" :src="item.url"></VanImage>
            <view class="item-name">{{ item.name }}</view>
          </view>
        </view>
      </view>

      <!--广告-->
      <Advertised height="700rpx" :src="advertisedList[2].url"></Advertised>

      <!--热门商品-->
      <view class="hot-commodity-wrap">
        <view class="hot-title">
          <view class="title-left">On Sales</view>
          <view class="title-right">VIEW ALL</view>
        </view>
        <view class="list">
          <view class="not-data" v-if="hotList.length === 0">not data</view>
          <view class="item" v-for="item in hotList" :key="item.id">
            <view class="image-wrap">
              <VanImage :src="$basePathImg + item.url"></VanImage>
            </view>
            <view class="item-body-wrap">
              <!--当前价格-->
              <view class="line now-price price-wrap">
                <priceWrap :value="item.nowPrice" color="#d52c1c">
                  <template #right>with code</template>
                </priceWrap>
              </view>
              <!--原价格-->
              <view class="line org-price" v-if="item.orgPrice">
                <priceWrap isDel :value="item.orgPrice" color="#6b6b6b">
                  <template #left>Regular:</template>
                </priceWrap>
              </view>
              <!--差价-->
              <view class="line diff-num">
                <priceWrap :value="item.diffPrice" color="#80b871">
                  <template #left>You Save:</template>
                </priceWrap>
              </view>

              <!--标题-->
              <TextEllipsis class="title" rows="2" :content="item.title" />

              <view class="label-wrap">
                <view class="label-item">
                  <view class="label-icon" style="color: #77bfc8">
                    <Icon name="smile-o"></Icon>
                  </view>
                  <view class="label-name">
                    <view class="name-content">Most Popular</view>
                  </view>
                </view>
                <view class="label-item">
                  <view class="label-icon" style="color: #e85749">
                    <Icon name="sign"></Icon>
                  </view>
                  <view class="label-name">
                    <view class="name-content">Jersey Assurance</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--广告-->
      <Advertised height="250rpx" :src="advertisedList[3].url"></Advertised>

      <!--分类2-->
      <view class="category-wrap2">
        <view>
          <view class="scroll-list">
            <view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
              <view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1" :class="[index1 === item.length - 1 && 'scroll-list__line__item--no-margin-right']">
                <VanImage class="scroll-list__line__item__image" :src="item1.icon"></VanImage>
                <view class="scroll-list__line__item__text">{{ item1.name }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--广告-->
      <Advertised height="550rpx" :src="advertisedList[4].url"></Advertised>
      <Advertised height="220rpx" :src="advertisedList[5].url"></Advertised>
      <Advertised height="220rpx" :src="advertisedList[6].url"></Advertised>
      <Advertised height="220rpx" :src="advertisedList[7].url"></Advertised>
      <Advertised height="700rpx" :src="advertisedList[8].url"></Advertised>

      <!--评论-->
      <view class="comment-wrap">
        <view class="comment-title">
          <view class="title-left">
            <Rate class="rate" v-model="commentLevel" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />
            <view class="count">{{ commentCount }} Reviews</view>
          </view>
          <view class="title-right">move</view>
        </view>
        <view class="list">
          <view class="item" v-for="item in commentList" :key="item.id">
            <view class="comment-image-wrap">
              <VanImage :src="item.url"></VanImage>
            </view>
            <view class="item-body-wrap">
              <view class="line name">{{ item.name }}</view>
              <view class="line time">{{ item.time }}</view>
              <view class="line">
                <Rate class="rate" v-model="item.level" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />
              </view>
              <view class="line title">
                <TextEllipsis class="title" rows="4" :content="item.content" />
              </view>
            </view>
          </view>
        </view>

        <!--更多-->
        <view class="more">
          <view class="more-btn">Show more reviews</view>
        </view>
      </view>

      <!--底部 = 注册 & logo & 版权-->
      <copyrightWrap />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { Rate, Icon, TextEllipsis, Image as VanImage } from 'vant';
import { randomWord, randomImage, uuid, randomTool } from '@/utils/commom';
import bmNavbar from '@/subPackages/share/navbar.vue';
import priceWrap from '@/subPackages/share/priceWrap.vue';
import copyrightWrap from '@/subPackages/share/copyrightWrap/copyrightWrap.vue';
import Advertised from '@/subPackages/share/components/advertised.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { getAdvertisingApi, getProdListByTagIdApi } from '@/api/share/share';
import { onShow } from '@dcloudio/uni-app';
const { tabBarHeightUnit } = useSystemInfo();

onShow(() => {
  getHotList();
  getAdvertising();
});

// 广告
const advertisedList = ref(
  Array.from({ length: 9 }, (item, index) => {
    return { detail: {}, id: uuid(), name: randomWord(), url: '', url2: randomImage(), sort: index };
  }),
);
function getAdvertising() {
  getAdvertisingApi().then((res) => {
    // console.log('广告', res);
    for (let item of res.data) {
      const d = advertisedList.value.find((e) => e.sort === item.sort);
      if (!d) continue;
      d.detail = item;
      d.url = item.img;
      d.name = item.name;
      d.id = item.id;
    }
  });
  console.log('广告', advertisedList.value);
}

// 分类
const categoryList = ref([
  { id: uuid(), name: 'NFL', url: randomImage() },
  { id: uuid(), name: 'NCAA', url: randomImage() },
  { id: uuid(), name: 'MLB', url: randomImage() },
  { id: uuid(), name: 'NBA', url: randomImage() },
  { id: uuid(), name: 'NHL', url: randomImage() },
  { id: uuid(), name: 'MLS', url: randomImage() },
  { id: uuid(), name: 'Soccer', url: randomImage() },
  { id: uuid(), name: 'NASCAR', url: randomImage() },
  { id: uuid(), name: 'WWE', url: randomImage() },
  { id: uuid(), name: 'WNBA', url: randomImage() },
  { id: uuid(), name: 'Golf', url: randomImage() },
  { id: uuid(), name: 'F1', url: randomImage() },
]);

// 热门商品
const hotList = ref(
  Array.from({ length: 0 }, () => {
    const nowPrice = randomTool.price();
    const orgPrice = randomTool.price();
    return {
      id: uuid(),
      name: randomWord(),
      url: randomImage(),
      nowPrice: nowPrice,
      orgPrice: orgPrice,
      diffPrice: (nowPrice - orgPrice).toFixed(2),
      title: randomTool.title(),
    };
  }),
);
function getHotList() {
  getProdListByTagIdApi().then((res) => {
    // console.log('热门商品', res);
    hotList.value = res.data.records.map((e) => {
      return {
        detail: e,
        id: e.prodId,
        name: e.prodName,
        url: e.pic,
        nowPrice: e.price,
        orgPrice: e.oriPrice,
        diffPrice: (e.price - e.oriPrice || 0).toFixed(2),
        title: e.prodName,
      };
    });
  });
}

// 评论
const commentLevel = ref(5);
const commentCount = ref(randomTool.num(0, 20));
const commentList = ref(
  Array.from({ length: commentCount.value }, () => {
    const nowPrice = randomTool.price();
    const orgPrice = randomTool.price();
    return {
      id: uuid(),
      name: randomWord(),
      url: randomImage(),
      level: randomTool.num(0, 5),
      content: randomTool.title(30),
      nowPrice: nowPrice,
      orgPrice: orgPrice,
      diffPrice: (nowPrice - orgPrice).toFixed(2),
      title: randomTool.title(),
      time: randomTool.time(),
    };
  }),
);

// 分类2
const menuArr = ref([
  [
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
  ],
  [
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
    {
      name: randomWord(),
      icon: randomImage(),
    },
  ],
]);
</script>

<style lang="scss">
.van-image {
  width: 100%;
  height: 100%;
}

.not-data {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20rpx;
  color: #808080;
}
.share-layout {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: calc(100vh - v-bind(tabBarHeightUnit));

  .body-wrap {
    flex: 1;
    overflow: auto;
    padding: 0 18rpx;

    // 广告
    .advertised {
      background: #f2f2f2;
      border-top: 1rpx solid #bbb;
      border-bottom: 1rpx solid #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      .image {
        width: 100%;
        height: 100%;
      }
    }

    // 分类
    .category-wrap {
      padding: 0 36rpx;

      .title {
        margin: 18rpx 0;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34rpx;
        font-family: 'monica-ext-font_YIBBBFG', serif;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        padding-left: 2rpx;

        .item-container {
          margin-bottom: 50rpx;
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item-head {
            box-shadow: rgba(0, 0, 0, 0.1) 0rpx 8rpx 24rpx;
            border-radius: 50%;
            overflow: hidden;
            width: 130rpx;
            height: 130rpx;
          }
          .item-name {
            margin-top: 8rpx;
            font-size: 24rpx;
            text-align: center;
          }
        }
      }
    }

    // 热门商品
    .hot-commodity-wrap {
      padding: 10rpx 0;

      .hot-title {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0 2rpx 0;
        margin-bottom: 10rpx;
        .title-left {
          font-weight: bold;
          font-family: 'monica-ext-font_YIBBBFG', serif;
        }
        .title-right {
          text-decoration: underline;
          font-size: 12px;
        }
      }
      .list {
        display: flex;
        overflow: auto;
        $itemWidth: 420rpx;
        padding-bottom: 24rpx;

        .item {
          border: 2rpx solid #e8e8e8;
          min-width: $itemWidth;
          margin-right: 36rpx;
          overflow: hidden;
          border-radius: 12rpx;

          &:last-child {
            margin-right: 0;
          }

          .image-wrap {
            margin-bottom: 24rpx;
            width: $itemWidth;
            height: calc($itemWidth + 50rpx);
            image {
              width: 100%;
              height: 100%;
            }
          }

          .item-body-wrap {
            padding: 3px 8px 9px 8px;

            .line {
              min-height: 44rpx;
              font-size: 20rpx;
              display: flex;
              align-items: center;
            }
            .now-price {
              margin-bottom: 8rpx;
            }
            .org-price {
              margin-bottom: 8rpx;
            }
            .diff-num {
            }
            .title {
              font-size: 24rpx;
              letter-spacing: 0.2rpx;
              margin-top: 8rpx;
            }

            .label-wrap {
              margin-top: 20rpx;
              .label-item {
                display: flex;
                margin-bottom: 8rpx;
                .label-icon {
                  min-width: 50rpx;
                  min-height: 50rpx;
                  margin-right: 16rpx;
                  font-size: 24px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .label-name {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  .name-content {
                    font-size: 26rpx;
                    width: 240rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }
    }

    // 分类2
    .category-wrap2 {
      margin-top: 40rpx;
      padding: 0 12rpx;
      .scroll-list {
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding-bottom: 46rpx;
        // 行
        .scroll-list__line {
          display: flex;
          margin-top: 20rpx;
          // 列 item
          .scroll-list__line__item {
            margin-right: 30rpx;
            .scroll-list__line__item__image {
              width: 200rpx;
              height: 200rpx;
              border-radius: 50%;
              overflow: hidden;
              border: 2rpx solid #f2f2f2;
            }
            .scroll-list__line__item__text {
              margin-top: 10rpx;
              color: #606266ff;
              font-size: 24rpx;
              text-align: center;
            }
          }
        }
      }
    }

    // 评论
    .comment-wrap {
      padding: 10rpx 0;

      .comment-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx 0 0 0;
        margin-bottom: 10rpx;
        .title-left {
          display: flex;
          align-items: center;
          .count {
            margin-left: 20rpx;
          }
        }
        .title-right {
          font-weight: bold;
          text-decoration: underline;
        }
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: auto;

        .item {
          width: 49%;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20rpx;
          border: 2rpx solid #e8e8e8;

          .comment-image-wrap {
            margin-bottom: 18rpx;
            width: 100%;
            height: 450rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }

          .item-body-wrap {
            padding: 3px 8px 9px 8px;
            .line {
              font-size: 20rpx;
              display: flex;
              align-items: center;
              margin-bottom: 10rpx;
              &:last-child {
                margin-bottom: 0;
              }
            }
            .name {
              font-size: 16px;
              font-weight: 600;
            }
            .time {
              font-size: 12px;
              color: #6f6f6f;
              letter-spacing: 0.6px;
            }
            .title {
              width: 100%;
              font-size: 14px;
              letter-spacing: 0.4px;
            }
          }
        }
      }

      .more {
        margin-top: 26rpx;
        margin-bottom: 10rpx;
        display: flex;
        justify-content: center;
        .more-btn {
          border: 2rpx solid #4d4d4d;
          padding: 14rpx 32rpx;
        }
      }
    }
  }
}
</style>
