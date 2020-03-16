<template> <!--这是登录组件-->
    <div>
        <van-row>
            <van-tabs v-model="active">
                <van-tab v-for="tag in tags" :title='tag'>
                </van-tab>
            </van-tabs>
        </van-row>
        <van-row>
            <van-grid square :column-num="3">
                <van-grid-item v-for="(card, index) in selectedCardList(tags[active])">{{card.name}}</van-grid-item>
            </van-grid>
        </van-row>
    </div>
</template>


<script>
import Vue from 'vue'  
import { Grid, GridItem, Tab, Tabs } from 'vant';
Vue.use(GridItem).use(Grid).use(Tab).use(Tabs);

const WANT = '想';
const TOOL = '工具';
const FOOD = '食物';
const PEOPLE = '人';
const ANIMAL = '动物';
const BODY = '身体';
const CLOTH = '衣服';
const TRAFFIC = '交通工具';
const LOCATION = '地点';
const TIME = '时间';
const MOOD = '心情';
const MOTION = '动作';
const CONTRACT = '对比';
const ASK = '提问';
const CUSTOMIZE = '我的';
export default {
    data() { //注意: 组件中的data必须得是function
        return {
            tags:['想', '工具', '食物', '人', '动物', '身体', '衣服', '交通工具', '地点'],
            active: 0,
            cardList: [
            {
            name: '我想要',
            category: WANT,
            pictureLink: "",
            },
            {
            name: '是的',
            category: WANT,
            pictureLink: "",
            },
            {
            name: '玩具',
            category: TOOL,
            pictureLink: "",
            },
            {
            name: '图画书',
            category: TOOL,
            pictureLink: "",
            },
            {
            name: '球',
            category: TOOL,
            pictureLink: "",
            },
            {
            name: '画画',
            category: TOOL,
            pictureLink: "",
            },
            {
            name: '水',
            category: FOOD,
            pictureLink: "",
            },
            {
            name: '牛奶',
            category: FOOD,
            pictureLink: "",
            },
            {
            name: '果汁',
            category: FOOD,
            pictureLink: "",
            },
            {
            name: '茶',
            category: FOOD,
            pictureLink: "",
            },
        ]
        };
    },
    methods: {            
        selectedCardList(categoryName) {
            let returnedList = []
            console.log(this.cardList)
            for (let idx in this.cardList) {
                const currentCard = this.cardList[idx]
                if (currentCard.category === categoryName) {
                    returnedList.push(currentCard)
                }
            }
            return returnedList     
        }
    }
}
</script>