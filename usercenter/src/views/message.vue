<template>
  <div class="message">
    <div class="tabs">
        <div class="tab" @click="toggleTab('information')">
            <h1>个人信息</h1>
            <div v-show="currentTab === 'information'" class="line"></div>
        </div>
        <div class="tab" @click="toggleTab('records')">
            <h1>兑换记录</h1>
            <div v-show="currentTab === 'records'" class="line"></div>
        </div>
    </div>

    <div class="card">
        <component :is="currentTab" ></component>
    </div>
   
  </div>
</template>

<script>
import information from "../components/information"
import records from "../components/records"
export default {
  name: "message",
  data () {  
    return {  
      currentTab: 'information',
        
    }  

  },
  components: {
    information,
    records
  },
  methods: {
    toggleTab(tab) {
        this.currentTab = tab; 
    }
  }
};
</script>

<style scope lang="scss">
.message{
  padding: 20px 150px;
  .tabs{
    display: flex;
    h1{
      margin-right: 30px;
      cursor: pointer;
    }
    .line{
      background-color: #b873f8;
      height: 5px; 
      width: 128px;
    }
  }
  .card{
    width: 900px;
    margin-top: 20px;
    box-shadow: 1px 2px 15px #e8e8e8;

  }
            
}  
</style>
