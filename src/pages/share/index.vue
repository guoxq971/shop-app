<!--首页-->
<template>
  <view class="share-layout">
    <!--顶部导航栏-->
    <bmNavbar />

    <view class="body-wrap">
      <!--广告-->
      <view class="advertised" style="height: 100rpx">
        <image class="image" :src="advertisedList[0].url" />
      </view>

      <!--分类-->
      <view class="category-wrap">
        <view class="title">Shop Your Favorite League</view>
        <view class="list">
          <view class="item-container" v-for="item in categoryList" :key="item.id">
            <image class="item-head" :src="item.url"></image>
            <view class="item-name">{{ item.name }}</view>
          </view>
        </view>
      </view>

      <!--广告-->
      <view class="advertised" style="height: 700rpx">
        <image class="image" :src="advertisedList[1].url" />
      </view>

      <!--热门商品-->
      <view class="hot-commodity-wrap">
        <view class="hot-title">
          <view class="title-left">On Sales</view>
          <view class="title-right">VIEW ALL</view>
        </view>
        <view class="list">
          <view class="item" v-for="item in hotList" :key="item.id">
            <view class="image-wrap">
              <image :src="item.url"></image>
            </view>
            <view class="item-body-wrap">
              <!--当前价格-->
              <view class="line now-price price-wrap">
                <priceWrap :value="item.nowPrice" color="#d52c1c">
                  <template #right>with code</template>
                </priceWrap>
              </view>
              <!--原价格-->
              <view class="line org-price">
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
      <view class="advertised" style="height: 250rpx">
        <image class="image" :src="advertisedList[2].url" />
      </view>

      <!--分类2-->
      <view class="category-wrap2">
        <view>
          <view class="scroll-list">
            <view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
              <view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1" :class="[index1 === item.length - 1 && 'scroll-list__line__item--no-margin-right']">
                <image class="scroll-list__line__item__image" :src="item1.icon"></image>
                <view class="scroll-list__line__item__text">{{ item1.name }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!--广告-->
      <view class="advertised" style="height: 550rpx">
        <image class="image" :src="advertisedList[3].url" />
      </view>
      <view class="advertised" style="height: 220rpx">
        <image class="image" :src="advertisedList[4].url" />
      </view>
      <view class="advertised" style="height: 220rpx">
        <image class="image" :src="advertisedList[5].url" />
      </view>
      <view class="advertised" style="height: 220rpx">
        <image class="image" :src="advertisedList[6].url" />
      </view>
      <view class="advertised" style="height: 700rpx">
        <image class="image" :src="advertisedList[7].url" />
      </view>

      <!--评论-->
      <view class="comment-wrap">
        <view class="comment-title">
          <view class="title-left">☆☆☆☆☆ 437,466 Reviews</view>
          <view class="title-right">move</view>
        </view>
        <view class="list">
          <view class="item" v-for="item in hotList" :key="item.id">
            <view class="image-wrap">
              <image :src="item.url"></image>
            </view>
            <view class="item-body-wrap">
              <view class="line now-price">卖家名</view>
              <view class="line org-price">时间</view>
              <view class="line diff-num">评星</view>
              <view class="line title">描述</view>
            </view>
          </view>
        </view>

        <!--更多-->
        <view class="more">
          <view class="more-btn">Show more reviews</view>
        </view>
      </view>

      <!--底部 = 注册 & logo & 版权-->
      <view class="copyright-wrap">
        <view class="copyright-title">SIGN UP & SAVE</view>

        <!--登陆/注册-->
        <view class="sign-wrap">
          <view class="sign-wrap-bd">
            <view class="xxx">xxxxxxxxxxx</view>
            <Field class="ipt" type="text" placeholder="Enter your email address..." />
            <view class="btn-wrap">
              <VanButton class="btn">SIGN UP</VanButton>
            </view>
          </view>
        </view>

        <!--网站优势-->
        <view class="advantage">
          <view class="advantage-bd">
            <bm-box v-for="item in 4" width="50%">
              <view class="item-box">
                <view class="box">网站优势{{ item }}</view>
              </view>
            </bm-box>
          </view>
        </view>

        <!--logo-->
        <view class="logo-wrap">
          <view class="logo">logo</view>
        </view>

        <!--折叠面板-->
        <view class="collapse-wrap">
          <Collapse v-model="activeCollapse">
            <CollapseItem title="CONTACT & INFO" name="1">
              <text>CONTACT & INFO</text>
            </CollapseItem>
            <CollapseItem title="TERMS & POLICIES" name="2">
              <text>TERMS & POLICIES</text>
            </CollapseItem>
            <CollapseItem title="SAY CONNECTED WITH US" name="3">
              <text>SAY CONNECTED WITH US</text>
            </CollapseItem>
          </Collapse>
        </view>

        <!--多个链接-->
        <view class="link-wrap">
          <view class="link-wrap-bd">
            <bm-box width="20%" class="link">
              <view class="link-item">twitter</view>
            </bm-box>
            <bm-box width="20%" class="link">
              <view class="link-item">face</view>
            </bm-box>
            <bm-box width="20%" class="link">
              <view class="link-item">ins</view>
            </bm-box>
            <bm-box width="20%" class="link">
              <view class="link-item">xxx</view>
            </bm-box>
            <bm-box width="20%" class="link">
              <view class="link-item">xxx</view>
            </bm-box>
          </view>
        </view>

        <!--版权-->
        <view class="copyright-wrap-bottom">
          <view class="chunk"></view>
          <view class="text">2023 xxxxxx. All Right Reserved Powered by xxx</view>
        </view>
        <view class="copyright-wrap-chunk-wrap">
          <view class="chunk">paypal</view>
          <view class="chunk">Klarna</view>
          <view class="chunk">stripe</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { Icon, TextEllipsis, Button as VanButton, Field, Collapse, CollapseItem } from 'vant';
import { randomWord, randomImage, uuid, randomTool } from '@/utils/commom';
import bmBox from '@/components/bm/box/box.vue';
import bmNavbar from '@/subPackages/share/navbar.vue';
import priceWrap from '@/subPackages/share/priceWrap.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
const { tabBarHeightUnit } = useSystemInfo();

const advertisedList = ref(
  Array.from({ length: 10 }, () => {
    return { id: uuid(), name: randomWord(), url: randomImage() };
  }),
);

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
  Array.from({ length: 10 }, () => {
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

// 版权
const activeCollapse = ref([]);
</script>

<style lang="scss">
$searchPaddingLeftRight: 18rpx;

.share-layout {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: calc(100vh - v-bind(tabBarHeightUnit));

  .body-wrap {
    flex: 1;
    overflow: auto;

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
      padding: 0 54rpx;

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
      padding: 10rpx $searchPaddingLeftRight;

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
              font-size: 22rpx;
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
      padding: 0 30rpx;
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
      padding: 10rpx $searchPaddingLeftRight;

      .comment-title {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
        margin-bottom: 10rpx;
        .title-left {
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

          .image-wrap {
            margin-bottom: 18rpx;
            width: 100%;
            height: 450rpx;
            //border: 2rpx solid #f2f2f2;
            border-radius: 8rpx;
            overflow: hidden;
            image {
              width: 100%;
              height: 100%;
            }
          }

          .item-body-wrap {
            padding: 3px 8px 9px 8px;
            .line {
              height: 44rpx;
              font-size: 20rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #f2f2f2;
            }
            .now-price {
              margin-bottom: 6rpx;
            }
            .org-price {
              margin-bottom: 6rpx;
            }
            .diff-num {
            }
            .title {
              margin-top: 18rpx;
              height: 90rpx;
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

    // 版权
    .copyright-wrap {
      border-top: 2rpx solid #bbb;

      .copyright-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 88rpx;
        font-weight: bold;
      }

      // 登录/注册
      .sign-wrap {
        border-bottom: 2rpx solid #bbb;
        padding: 20rpx 0 32rpx 0;
        .sign-wrap-bd {
          padding: 0 $searchPaddingLeftRight;

          .xxx {
            color: #888;
            margin-bottom: 12rpx;
          }
          .ipt {
            margin-bottom: 12rpx;
          }
          .btn-wrap {
            width: 100%;
            display: flex;
            justify-content: center;
            .btn {
              width: 100%;
            }
          }
        }
      }

      // 网站优势
      .advantage {
        border-bottom: 2rpx solid #bbb;
        padding: 20rpx 0 32rpx 0;
        .advantage-bd {
          display: flex;
          flex-wrap: wrap;
          padding: 0 40rpx;
          .item-box {
            padding: 8rpx;
            width: 100%;
            height: 100%;
            .box {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 2rpx solid #bbb;
            }
          }
        }
      }

      // logo
      .logo-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 47px;
        margin-top: 10px;
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #bbb;
          width: 45%;
          height: 37px;
        }
      }

      // 折叠面板
      .collapse-wrap {
        padding: 0 20rpx;
        margin-top: 30rpx;
      }

      // 多个链接
      .link-wrap {
        margin-top: 60rpx;
        padding: 0 40rpx;
        .link-wrap-bd {
          gap: 20rpx;
          display: flex;
          justify-content: center;
          border-bottom: 2rpx solid #bbb;
          padding: 0 66rpx 54rpx 66rpx;
        }
        .link-item {
          width: 100%;
          height: 100%;
          font-size: 26rpx;
          border-radius: 6rpx;
          border: 2rpx solid #bbb;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      // 版权
      .copyright-wrap-bottom {
        display: flex;
        justify-content: center;
        margin-top: 30rpx;
        padding: 30rpx 0;
        .chunk {
          width: 36rpx;
          height: 36rpx;
          background: #bbb;
        }
        .text {
          font-size: 24rpx;
          font-weight: bold;
          margin-left: 14rpx;
          display: flex;
          align-items: center;
        }
      }
      .copyright-wrap-chunk-wrap {
        display: flex;
        justify-content: center;
        gap: 20rpx;
        margin-bottom: 26rpx;
        .chunk {
          background: #f2f2f2;
          width: 188rpx;
          height: 60rpx;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
