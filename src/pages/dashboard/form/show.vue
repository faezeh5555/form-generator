<template>
  <!---------------------|main-form-creator|------------------------------------------->
  <main class="form-view">
    <!-------------------|section-form-area|------------->
    <section class="form-area">
      <ul class="form-zone" ref="formZone">
        <li
          class="drag-el" 
          v-for="item in formItems" 
          :key="item.id" 
          :style="{ position: 'absolute', left: item.x + 'px', top: item.y + 'px' }">

          <!--|based of each input type then we display specific input here|-->
          <input v-if="item.class == 'text'" v-model="item.value" type="text" placeholder="Enter string">
          <input v-if="item.class == 'number' " v-model="item.value" type="number" placeholder="Enter number">
          <input v-if="item.class == 'color' " v-model="item.value" type="text" placeholder="Enter color">
          
          <FmSelectOption v-if="item.class == 'select'" @selected-item-change="(newValue) => updateItemValue(item, newValue)" :items="item.options" :hasUserIcon="false" type="singleSelect"/>
          <FmSelectOption v-if="item.class == 'multiSelect'" @selected-item-change="(newValue) => updateItemValue(item, newValue)" :items="item.options" :hasUserIcon="true" type="multiSelect"/>
          
      
      </li>
      </ul>

    </section>
  </main>

</template>

<script>
import FmSelectOption from '../../../components/FmSelectOption.vue';

export default {
  components:{FmSelectOption},

  data() {
    return {
      formItems: [],
      formName:this.$route.params.name,
    };
  },
  methods: {
    updateItemValue(item, newValue){
      item.value = newValue;
    },
 
  },
  computed:{
    forms(){
      return this.$store.state.forms;
    }
  },
  created(){
      this.formItems =  this.forms[this.formName];
  }
      
};
</script>
