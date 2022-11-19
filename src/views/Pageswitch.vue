<template>
    <div class="pagination">
        <button @click="changeBtn1()">首页</button>
        <button @click="changeBtnpre">上一页</button>
        <button v-for="btn in pagebtns" :key="btn.id" @click="changeBtn(btn.num)"
        :class="[{currentPage:(btn.num==currentPage)},'pagebtns']">
            {{btn.num}}
        </button>
        <button @click="changeBtnnext">下一页</button>
        <button @click="changeBtnnend">末页</button>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive , watch } from "vue"






const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  maxpage: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])




let pagebtns = reactive([
{id:1,num:1},
{id:2,num:2},
{id:3,num:3},
{id:4,num:4},
{id:5,num:5}
])
let currentPage = ref(1);

watch(() => props.modelValue, (newValue, oldValue) => {
  event_renew();
})
let maxp = props.maxpage;
watch(() => props.maxpage, (newValue, oldValue) => {
  maxp = props.maxpage
})

function event_renew(){
    currentPage.value = props.modelValue;
    changeBtn(currentPage.value)
}


function changeBtn1(){
    currentPage.value = 1;
    emit('update:modelValue', currentPage.value)
    pagebtns = reactive([
    {id:1,num:1},
    {id:2,num:2},
    {id:3,num:3},
    {id:4,num:4},
    {id:5,num:5}
    ])
}

function changeBtnpre(){
    if(currentPage.value != 1){
        currentPage.value--;
    }

    if(currentPage.value >= 3){
        for (let index = 0; index < 5; index++) {
            pagebtns[index].num = currentPage.value - 2 + index;
        }
    }
    else{for (let index = 0; index < 5; index++) {
            pagebtns[index].num = 1 + index;
        }}

    emit('update:modelValue', currentPage.value)

}
function changeBtn(page){
    currentPage.value = page;
    if(currentPage.value >= 3 && currentPage.value <= maxp - 2){
        for (let index = 0; index < 5; index++) {
            pagebtns[index].num = currentPage.value - 2 + index;
        }
    }
    else if(currentPage.value <= 2){
        for (let index = 0; index < 5; index++) {
            pagebtns[index].num = 1 + index;
        }
    }
    else if(maxp >= 5){
        for (let index = 0; index < 5; index++) {
            pagebtns[index].num = maxp - 4 + index;
        }
    }
    else {
        for (let index = 0; index < 5; index++) {
        pagebtns[index].num = index + 1;
        }
    }

    emit('update:modelValue', currentPage.value)
}

function changeBtnnext(){

        currentPage.value++;

        if(currentPage.value >= 3 && currentPage.value <= maxp - 2){
        for (let index = 0; index < 5; index++) {
            pagebtns[index].num = currentPage.value - 2 + index;
        }
    }

    emit('update:modelValue', currentPage.value)
   
}

function changeBtnnend(){
    currentPage.value = maxp;
    emit('update:modelValue', currentPage.value)
    if(maxp >= 5){
    for (let index = 0; index < 5; index++) {
        pagebtns[index].num = maxp - 4 + index;
    }
    }
    else {
        for (let index = 0; index < 5; index++) {
        pagebtns[index].num = index + 1;
        }
    }
}







</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: rgb(255, 191, 0);
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: rgb(255, 234, 0);
    border: 1px solid #ddd;
    color: #877777;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #c47c00;

  }
</style>