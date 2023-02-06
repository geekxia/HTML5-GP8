<script setup>
  import { reactive, ref } from 'vue'
  const form = ref()
  const ruleForm = reactive({
    name: '',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  const rules = {
    name: [
      { required: true, message: '商品名称是必填字段', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
      {
        required: true,
        message: '区域选择是必填字段',
        trigger: 'change',
      },
    ],
    date1: [
      {
        type: 'string',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],
    date2: [
      {
        type: 'string',
        required: true,
        message: 'Please pick a time',
        trigger: 'change',
      },
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
    resource: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change',
      },
    ],
    desc: [
      { required: true, message: 'Please input activity form', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          console.log('---', value)
          if (value.trim().length > 10) {
            return callback(new Error('描述文字不能超过10个字'))
          }
          callback()  // 坑
        },
        trigger: 'change'
      }
    ]
  }

  const submit = (form) => {
    if (!form) return
    console.log('----form', form)
    form.validate((valid)=>{
      console.log('---isValid', isValid)
      if (valid) {
        console.log('---提交', ruleForm)
      } else {
        console.log('--验证未通过')
        // return false
      }
    })
  }

  const reset = (form) => {
    console.log('---form', form)
    form.resetFields()
  }

</script>

<template>
  <div class="good-form">
    <div class="wrap">
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item label="选择区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="选择时间" required>
          <el-col :span="24">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
                value-format='YYYY-MM-DD'
                format='YYYY-MM-DD'
              />
            </el-form-item>
            <span class="text-gray-500">-</span>
            <el-form-item prop="date2">
              <el-time-picker
                v-model="ruleForm.date2"
                label="Pick a time"
                placeholder="Pick a time"
                style="width: 100%"
                value-format='HH:mm:ss'
                format='HH:mm:ss'
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="是否派送" prop="delivery">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>

        <el-form-item label="选择模式" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="是否开启" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="Sponsorship" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注说明" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit(form)"
            >提交</el-button
          >
          <el-button @click="reset(form)">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .good-form {
    .wrap {
      width: 500px;
    }
  }
</style>
