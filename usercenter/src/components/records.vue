<template>
  <div class="records" >
    <div class="record" v-for="(item,index) in record" :key="'record'+index">
        <img :src="item.image" alt="">
        <p>{{ item.name }}</p>
        <p>{{ item.createAt | formatTime }}</p>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex"
import Moment from 'moment'
export default {
    name: "records",
    filters: {
        formatTime (value) {
            return Moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    data(){
        return{
            record:[]
        }
    },
    created() {
        this.getRecord()
    },
    computed: {
        ...mapState({
            "user": state => state.login.user
        }),
    },
    methods: {
        async getRecord(){
            let id = this.user._id
            const data = await this.yGet("/shop/exchangedRecord",{
                params:{id}
            })
            if(data){
                console.log("data",data)
                this.record = data
            }
        },
    },
}
</script>

<style lang="scss">
.records{
    padding: 20px 40px;
    min-height: 600px;
    .record{
        height: 100px;
        border-bottom: 2px solid #f3f3f3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        img{
            width: 80px;
        }
        p{
            padding: 0 10px;
        }
    }
}    
</style>