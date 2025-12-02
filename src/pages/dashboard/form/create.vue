<template>
  <!---------------------|main-form-creator|------------------------------------------->
  <main class="form-creator">
    <!-------------------|section-form-area|------------->
    <section class="form-area">
      <ul class="form-zone" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent ref="formZone">
        <li
          class="drag-el" 
          v-for="item in formItems" 
          :key="item.id" 
          :style="{ position: 'absolute', left: item.x + 'px', top: item.y + 'px' }"
          draggable="true" 
          @dragstart="startDragFromForm($event, item)" 
          @dragover.prevent>

          <!--|based of each input type then we display specific input here|-->
          <input v-if="item.class == 'text'" v-model="item.value" type="text" placeholder="Enter string">
          <input v-if="item.class == 'number' " v-model="item.value" type="number" placeholder="Enter number">
          <input v-if="item.class == 'color' " v-model="item.value" type="text" placeholder="Enter color">
          
          <FmSelectOption v-if="item.class == 'select'" @selected-item-change="(newValue) => updateItemValue(item, newValue)" :items="item.options" :hasUserIcon="false" type="singleSelect"/>
          <FmSelectOption v-if="item.class == 'multiSelect'" @selected-item-change="(newValue) => updateItemValue(item, newValue)" :items="item.options" :hasUserIcon="true" type="multiSelect"/>
          
      
      </li>
      </ul>

    </section>
    <!-------------------|section-palet-zone|------------->
    <section class="palet-zone" @dragenter.prevent @dragover.prevent>
      <div class="title">Palett elements</div>

      <ul>
        <li v-for="item in paletItems" :key="item.id" >
          <div class="drag-el" draggable="true" @dragstart="startDrag($event , item)"><span>{{ item.title }}</span></div>
          <div class="icon" @click="onclick_showSubValidation(item)"><i class="fa-jelly-fill fa-regular fa-angle-down"></i></div>
          
          <ul class="sub-validation" v-if="item.showSubValidation">
            <li v-if="item.type == 'number'">
              <label for="">min</label>
              <input type="text" placeholder="" v-model="item.min">
            </li>
            <li v-if="item.type == 'number' ">
              <label for="">max</label>
              <input type="text" placeholder="" v-model="item.max">
            </li>
            <li>
              <label for="">require</label>
              <input type="checkbox" placeholder="" v-model="item.require">
            </li>
          </ul>
        </li>
      </ul>

      <button class="save-btn" @click="onclick_openSaveModal">Save Form</button>
    </section>
    <modal v-show="showModal" @save-btn-clicked="onclick_saveForm" @close-modal="closeModal"/>
  </main>




</template>


<script>
import FmSelectOption from '../../../components/FmSelectOption.vue';
import modal from "../../../components/modal.vue";

export default {
  components:{FmSelectOption, modal},

  data() {
    return {
      
      paletItems: [
        { id: 0, title: "Text input",class:"text", showSubValidation: false, type: "text", value: "",require:false },
        { id: 1, title: "Number input",class:"number", showSubValidation: false, type: "number", value: 0,min:"",max:"",require:false  },
        { id: 2, title: "Color input",class:"color", showSubValidation: false, type: "text", value: "",require:false  },
        { id: 3, title: "Select input", class:"select", showSubValidation: false, type: "select", value: "", options: ["Option 1", "Option 2", "Option 3"],require:false },
        { id: 3, title: "multiSelect input", class:"multiSelect", showSubValidation: false, type: "select", value: "", options: ["Option 1", "Option 2", "Option 3"],require:false }
      ],
      formItems: [],
      draggedItem: null, 
      dragSource: null,
      showSubValidation:false,
      showModal:false,
      formName:""
    };
  },
  methods: {


    /******************|drag-methods| */
    startDrag(event,item) {
     this.dragSource = 'palet';
      event.dataTransfer.dropEffect = 'copy';
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('itemId', item.id);
    },
    startDragFromForm(event, item) {
      this.draggedItem = item; 
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemId', item.id);
    },

    /******************|drop-methods| */
    //based on that element is pick up from palet zone or form zone we place them in correct place .
    //create or move them
    onDrop(event){
    
      //find dropped element from palet-zone
      const itemId = event.dataTransfer.getData('itemId');
      const item = this.paletItems.find(item => item.id == itemId);

      //find formZone position & dropped element position
      const formZone = this.$refs.formZone;
      const formZonePosition = formZone.getBoundingClientRect();
      const x = event.clientX - formZonePosition.left;
      const y = event.clientY - formZonePosition.top;

      //if we add item from palet zone then we need to create new item in formZone
      if (this.dragSource === 'palet'){
          let newItem = {};
          switch(item.class){
            case 'number':
               newItem = {id: item.id, title: item.title, class: item.class ,type: item.type, value: item.value, x: x, y: y ,min:item.min,max:item.max,require:item.require};
              break;
            case 'text':
               newItem = {id: item.id, title: item.title, class: item.class ,type: item.type, value: item.value, x: x, y: y, require:item.require };
              break;
            case 'color':
              newItem = {id: item.id, title: item.title, class: item.class ,type: item.type, value: item.value, x: x, y: y, require:item.require };
              break;
            case 'select':
               newItem = {id: item.id, title: item.title, class: item.class ,type: item.type, value: item.value, x: x, y: y, options:item.options ,require:item.require };
              break;
            case 'multiSelect':
              newItem = {id: item.id, title: item.title, class: item.class ,type: item.type, value: item.value, x: x, y: y ,options:item.options, require:item.require };
              break;
          }
          this.formItems.push(newItem);
        
         
      //if we want just move item in formZone 
      } else if (this.draggedItem) {
        
        this.draggedItem.x = x;
        this.draggedItem.y = y;
      }
      //reset these variables
      this.draggedItem = null;
      this.dragSource = null;
    },

    /**************|onclick| *******/
    onclick_showSubValidation(item){
      item.showSubValidation = !item.showSubValidation;
    },

    onclick_openSaveModal(){
      this.showModal= true
    },
    updateItemValue(item, newValue){
      item.value = newValue;
    },
    closeModal(){
      this.showModal= false
    },
    onclick_saveForm(name){
      this.formName = name
      this.showModal= false
      this.$store.commit('saveForm', {
        formName: this.formName,
        formItems: this.formItems
      });
      console.log(this.formItems);
    }
  }
};
</script>
