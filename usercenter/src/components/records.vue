<template>
  <div class="records" >
    <div class="record" v-for="(item,index) in record" :key="'item._id'+index">
        <img :src="item.image" alt="">
        <p>{{ item.name }}</p>
        <p>{{ item.createdAt | globalFormatTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "records",
    data(){
        return{
            record:[]
        }
    },
    created() {
        this.getRecord()
    },
    methods: {
        async getRecord(item){
            let id = localStorage.getItem('userid')
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