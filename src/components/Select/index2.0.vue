<template>
    <el-select v-model="selectValue">
       <el-option
            v-for="item in initOptionValue"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>                                                                                                                                                     
</template>

<script>
export default {
    name:"selectIndex2.0",
    props:{
        config:{
            type:Array,
            default:() => []
        },
        search_key:{
            type:String,
            default:""
        }
    },
    data (){
        return {
            selectValue:"",
            initOptionValue:[],
            option:[
                { value:"name",label:"姓名"},
                { value:"phone",label:"手机" },
                { value:"email",label:"邮箱"},
                { value:"id",label:"ID"},
                { value:"title",label:"标题"}        
            ]   
        }
    },

    methods: {
        initOption(){
            if (this.config.length === 0) {
                return false;
            }
            let optionArr = [];
            this.config.forEach(item => {
                let arr = this.option.filter(elem => elem.value == item);
                if (arr.length > 0) {
                    optionArr.push(arr[0]);
                }
            });
            if (optionArr.length === 0) {
                return false;
            }
            this.initOptionValue = optionArr;
            this.selectValue = optionArr[0].value;
        }
    },
    watch: {
        selectValue:{
            handler(newValue,oldValue){
                console.log("watch");
                this.$emit("update:search_key",newValue)
                // console.log(`-----${newValue}`);
            }
        }
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        this.initOption();
        console.log("created");
    },
    beforeMount() {  
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log("beforeDestroy");
    },
    destroyed() {
        console.log("destroyed");
    }
}
</script>

<style lang="scss" scoped>

</style>