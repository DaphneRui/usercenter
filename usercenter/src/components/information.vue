<template>
  <div class="information">
    <img :src="form.avatar" alt="" class="avater">
    <div class="info-container">
      <span>姓名 :<p>{{ form.username }}</p></span>
      <span>学校 :<p>{{ form.school }}</p></span>
      <span>昵称 :<p>{{ form.nickname }}</p></span>
      <span v-if="form.gender === 0">性别 :<p>女</p></span>
      <span v-else>性别 :<p>男</p></span>
      <span>密码 :<p v-if="form.password !== ''">******</p>
        <div @click="dialogFormVisible = true">修改</div>
      </span>
    </div>

    <el-dialog id="changePwd" title="修改密码"  :append-to-body=true :visible.sync="dialogFormVisible" >
      <el-form :model="changePwd" status-icon :rules="rules2" ref="changePwd" label-width="140px" >
        <el-form-item label="旧密码" prop="pass">
          <el-input type="password" v-model="changePwd.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passNew">
          <el-input type="password" v-model="changePwd.passNew" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="checkPass">
          <el-input type="password" v-model="changePwd.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button @click="closeForm('changePwd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "information",
  created() {
   
  },
  data() {
    var validatePass3 = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请输入旧密码！'));
      }else if (value!=this.form.password){
        callback(new Error('旧密码错误，请重新输入！'));
      } else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      }else if (value.length<6){
        callback(new Error('密码长度不符！'));
      } else {
        if (this.changePwd.checkPass != '') {
          this.$refs.changePwd.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      }else if (value.length<6){
        callback(new Error('密码长度不符！'));
      } else if (value !== this.changePwd.passNew) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      changePwd: {
        pass:'',
        passNew: '',
        checkPass: '',
      },
      rules2: {
        pass:[
          { required: true, validator: validatePass3, trigger: 'blur'},
          { min: 6, message: '请输入旧密码', trigger: 'blur'}
        ],
        passNew: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, message:'请输入新密码,6位以上', trigger: 'blur'}
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      "form": state => state.login.user
    }),
  },
  methods: {
    saveForm() {
      this.$refs.changePwd.validate((valid) => {
        if (valid) {
          this.updatePwd()
        }else {
          return false;
        }
      });
    },
    closeForm() {
      this.$refs.changePwd.resetFields();
      this.dialogFormVisible = false
    },
    async updatePwd(){
      let params = {
        oldPassword: this.form.password,
        newPassword: this.changePwd.checkPass,
      }
      const data = await this.yPut('/user/changePassword',params)
      console.log('pwd',data)
      if(data){
        localStorage.removeItem("userinfo")
        this.$router.replace({
          name: "login"
        })
        this.$message({
            type: 'success',
            message: '修改成功!'
        });
      }
    }    
  }

  
}
</script>

<style scope lang="scss">
.information{
  padding: 50px 100px;
  display: flex;
  height: 600px;
  .avater{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .info-container{
    width: 600px;
    height: 260px;
    padding:  30px 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    span{
      width: 250px;
      line-height: 50px;
      display: flex;
      padding-left: 20px;
      p{
        margin-left: 30px;
      }
      div{
        color: #6964d1; 
        cursor: pointer;
        margin-left: 20px;
      }
    }
  }

}   
</style>