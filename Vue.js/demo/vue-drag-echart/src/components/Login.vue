<template>
    <div>
        <h2>{{isLogin?'去登陆':'已登录'}}</h2>
        <ul>
            <li>{{number+1}}</li>
            <li>{{ok?'Yes':'No'}}</li>
            <li :class="{red:classRed}">{{message.split('').reverse().join('-')}}</li>
        </ul>
        
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            isLogin:true,
            number:34,
            ok:true,
            message:'我的vue世界',
            classRed:true
        }
    }
}
</script>

<style>
    .red{
        color: red;
    }
</style>
