<template>
  <div class="regist">
    <div class="regist-left">
        <img src="../assets/auth.png" alt="">
    </div>
    <div class="regist-right">
        <h1>注册新用户</h1>
        <el-form :model="registForm" :rules="rules" ref="registForm">
            <el-form-item class="regist-input" prop="username">
                <el-input type="text" placeholder="用户名：6位以上,数字或英文组成" v-model="registForm.username"/>
            </el-form-item>
            <el-form-item class="regist-input" prop="password">
                <el-input type="password" placeholder="密码" v-model="registForm.password"/>
            </el-form-item>
            <el-form-item class="regist-input" prop="school">
                <el-input type="text" placeholder="学校" v-model="registForm.school"/>
            </el-form-item>
            <el-form-item class="regist-input" prop="nickname">
                <el-input type="text" placeholder="昵称" v-model="registForm.nickname"/>
            </el-form-item>
            <el-form-item class="regist-input" prop="age">
                <el-input type="text" placeholder="请输入年龄" v-model.number="registForm.age"/>
            </el-form-item>
            <el-form-item class="regist-input" prop="gender">
              <el-select v-model="registForm.gender" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <div class="to-login">
                <p>已有账户？去</p>
                <p style="color: #6964d1; cursor: pointer;" @click="toLogin">登录</p>
            </div>
            <el-form-item class="to-regist">
                <el-button @click="checkData">注册</el-button>
            </el-form-item>
        
        </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "regist",
  data(){
    return{
      registForm: {
        username: '',
        password: '',
        school: '',
        nickname: '',
        age: '',
        gender: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名,6位以上数字或英文组成', 
            validator(rule, value, callback) {
              if (/^[a-zA-Z0-9]{6,}$/.test(value) == false) {
                  callback(new Error("请输入6位以上数字或英文"));
              } else {
                  callback();
              }
            },
            trigger: 'blur' 
          },
        ],
        password: [
          { required: true, message: '请输入密码,6位以上', min: 6, trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请输入学校', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        age: [
          { required: true, type: 'number', message: '请输入年龄,数字', trigger: 'blur' },
        ],
        gener: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
      }
    }        
    
  },
  methods: {
    toLogin(){
      this.$router.push({
        name: "login"
      })
    },
    checkData(){
      this.$refs.registForm.validate((valid) => {
          if (valid) {
          this.regist()
          console.log('成功')
          } else {
          return false;
          }
      })
    },
    async regist(){
      const data = await this.yPost('/user/regist',this.registForm)
      if(data){
        this.$message({
          type: 'success',
          message: '注册成功!'
        });
      }
    }
  },
};
</script>

<style scope lang="scss">
.regist{
    width: 1200px;
    margin: 70px auto 0;
    box-shadow: 1px 2px 15px #e8e8e8;
    display: flex;
    .regist-left{
        width: 600px;
        height: 678px;
        img{
            widtH: 100%;
            height: 678px;
        }
    }
    .regist-right{
        width: 600px;
        height: 678px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1{
            font-size: 36px;
            font-weight: 500;
            color: #202020;
            text-align: center;
            line-height: 50px;
        }
        .regist-input{
            width: 320px;
            height: 44px;
            text-align: center;
            margin: 20px auto 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            input{
                width: 320px;
                height: 44px;
                background: transparent;
                outline: none;
                border: 0;
                padding: 0 24px;
                margin: 0;
                font-size: 16px;
                font-weight: 400;
                outline: none;
            }
        }
        .to-login{
            font-size: 16px;
            font-weight: 500;
            color: #3f3f3f;
            line-height: 36px;
            text-align: center;
            padding-top: 20px;
            display: flex;
            justify-content: center;
        }
        .to-regist{
            padding-top: 20px;
            text-align: center;
            button{
                font-family: PingFangSC-Medium;
                font-size: 20px;
                color: #fff;
                border-color: #6964d1;
                width: 320px;
                height: 44px;
                background-color: #6964d1;
                border-radius: 4px;
                border: 0;
                outline: none;
                cursor: pointer;
            }
        }



    }
}  
</style>