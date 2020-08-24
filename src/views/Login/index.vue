<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    components:{},
    data() {
        return {
            menuTab:[
                {txt:'登录',current:true},
                {txt:'注册',current:false}
            ],
            isActive:true
        }
    },
    methods: {
        // vue 数据驱动视频渲染
        toggleMenu(data) {
            console.log(data)
        }
    }
}
</script>
<style lang='scss' scoped>
#login{
    background-color: #344a5f;
    height: 50vh;
}
.login-wrap{
    width: 330px;
    margin: auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .current{
        background-color: rgba(0, 0, 0, 0.192);
    }
}
</style>