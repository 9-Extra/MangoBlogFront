<template>
    <div class="pagination">
        <button @click="changeBtn1()">首页</button>
        <button @click="changeBtnpre">上一页</button>
        <button v-for="btn in pagebtns" :key="btn.id" @click="changeBtn(btn.num)"
        :class="[{currentPage:(btn.num==currentPage)},'pagebtns']">
            {{btn.num}}
        </button>
        <button @click="changeBtnnext">下一页</button>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { defineEmits } from 'vue'






const props = defineProps({
  modelValue: {
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


function changeBtn1(){
    currentPage.value = 1;
    emit('update:modelValue', currentPage.value)
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

function changeBtnnext(){

        currentPage.value++;

        if(currentPage.value >= 3){
        for (let index = 0; index < 5; index++) {
            pagebtns[index].num = currentPage.value - 2 + index;
        }
    }

    emit('update:modelValue', currentPage.value)
   
}





</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
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
    background-color: #1f1b1b;

  }
</style>