<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import { defineTableColumns } from 'vexip-ui'

const inputValue = ref<string>('')
const inputValue1 = ref<string>('')

const radioValue = ref<number>(1)

const datePickerValue1 = ref<Dayjs>()
const datePickerValue2 = ref<Dayjs>()
const datePickerValue3 = ref<Dayjs>()
const datePickerValue4 = ref<Dayjs>()

const selectValue1 = ref('lucy')
const selectValue2 = ref('lucy')
const selectValue3 = ref('lucy')
const selectOptions1 = ref([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' },
])
const selectOptions2 = ref([
  { value: 'lucy', label: 'Lucy' },
])
const selectOptions3 = ref([
  { value: 'lucy', label: 'Lucy' },
])

const sliderValue1 = ref<number>(0)
const sliderValue2 = ref<[number, number]>([20, 50])

const switchChecked = ref<boolean>(false)

const currentYear = new Date().getFullYear()
const columns = ref(
  defineTableColumns([
    {
      name: 'First Name',
      key: 'firstName',
    },
    {
      name: 'Last Name',
      key: 'lastName',
    },
    {
      name: 'Job',
      key: 'job',
      accessor: row => row.job,
      formatter: job => `Good ${job}`,
    },
    {
      name: 'Age',
      key: 'age',
      formatter: age => `${age} (${currentYear - age})`,
    },
  ]),
)
const data = ref(
  Array.from({ length: 5 }, (_, index) => {
    return {
      id: index + 1,
      firstName: `First ${index}`,
      lastName: `Last ${index}`,
      company: `Company ${index}`,
      job: `Job ${index}`,
      age: 20 + index,
      email: `email${index}@vexip.ui`,
      address: `Address ${index}`,
    }
  }),
)
</script>

<template>
  <div class="empty-container">
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 Fantastic-admin
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          本演示站基于 Fantastic-admin 源码开发，将 Element Plus 替换为 Vexip UI ，详细操作步骤请阅读官方文档。
        </div>
      </template>
    </PageHeader>
    <PageMain>
      <VxpSpace>
        <VxpButton type="primary">
          Primary Button
        </VxpButton>
        <VxpButton>Default Button</VxpButton>
        <VxpButton dashed>
          Dashed Button
        </VxpButton>
        <VxpButton text>
          Text Button
        </VxpButton>
        <VxpButton ghost type="primary">
          Ghost Button
        </VxpButton>
      </VxpSpace>
    </PageMain>
    <PageMain>
      <VxpSpace direction="vertical">
        <VxpInput v-model:value="inputValue" placeholder="Basic usage" />
        <VxpInput v-model:value.lazy="inputValue1" autofocus placeholder="Lazy usage" />
      </VxpSpace>
    </PageMain>
    <PageMain>
      <VxpRadioGroup v-model:value="radioValue">
        <VxpRadio :label="1">
          A
        </VxpRadio>
        <VxpRadio :label="2">
          B
        </VxpRadio>
        <VxpRadio :label="3">
          C
        </VxpRadio>
        <VxpRadio :label="4">
          D
        </VxpRadio>
      </VxpRadioGroup>
    </PageMain>
    <PageMain>
      <VxpSpace>
        <VxpDatePicker v-model:value="datePickerValue1" />
        <VxpDatePicker v-model:value="datePickerValue2" type="datetime" />
        <VxpDatePicker v-model:value="datePickerValue3" type="month" />
        <VxpDatePicker v-model:value="datePickerValue4" type="year" />
      </VxpSpace>
    </PageMain>
    <PageMain>
      <VxpSpace>
        <VxpSelect v-model:value="selectValue1" style="width: 120px;" :options="selectOptions1" />
        <VxpSelect v-model:value="selectValue2" style="width: 120px;" disabled :options="selectOptions2" />
        <VxpSelect v-model:value="selectValue3" style="width: 120px;" loading :options="selectOptions3" />
      </VxpSpace>
    </PageMain>
    <PageMain>
      <VxpSpace vertical>
        <VxpSlider v-model:value="sliderValue1" />
        <VxpSlider v-model:value="sliderValue2" range />
      </VxpSpace>
    </PageMain>
    <PageMain>
      <VxpSwitch v-model:checked="switchChecked" />
    </PageMain>
    <PageMain>
      <VxpTable :columns="columns" :data="data" :width="1000" :side-padding="[10, 5]" style="width: 100%;" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.empty-container {
  height: 100%;
  overflow: auto;

  .page-main {
    margin-bottom: 20px;
  }
}
</style>
