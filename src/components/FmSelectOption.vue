<template>
    <div :class="['fm-select-option',theme]" ref="selectOption">
        <div :class="['input-wrapper',{'input-shadow':hasShadow ,'two-columns':!hasUserIcon}] " ref="input-wrapper" @click="onclick_toggleClasses">
            <i class="fa-solid fa-user" v-if="hasUserIcon"></i>
            <input type="text" :placeholder="placeholder" v-model="singleSelectedItem.label" readonly>
            <div class="arrow-button">
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </div>
        
        <ul class="selected-items" v-if="type === 'multiSelect'">
            <li v-for="{id, label} in selectedItems" @click="onclick_deleteItem(id)">
                <div class="text">{{ label }}</div>
                <div class="icon-wrapper">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </li>
        </ul>

        <ul class="items" v-if="display">
            <li v-for="{id,label} in verifiedItems" :class="[{'selected-item': check_selectedItem(id)}]" @click="onclick_addItem(id,label)">{{ label }}</li>
        </ul>
    </div>
</template>
<script>
export default{
    props:{
        items : [Array,Object],
        type:{
            validator(value,props){
                return["multiSelect","singleSelect"].includes(value)
            }
        },
        theme: {
            type:String
        },
        hasUserIcon:{
            type:Boolean
        },
        placeholder:{
            type:String
        }
    },
    data(){
        return{
            selectedItems :[],
            singleSelectedItem :{id:null , label:""},
            display : false,
            hasShadow : false,
            repeatedItem:'',
            verifiedItems:[],
        }
    },
    methods: {
        /**
         * @method onclick_deleteItem - delete the item from selected_items that matches the entered id.
         * @param {int} id
         * @returns void 
         */
        onclick_deleteItem(id){
            this.selectedItems = this.selectedItems.filter((item) => item.id !== id);

        },
        /**
         * @method onclick_addItem - check that no item in selected_items matches the entered id and then add new item to selected_items
         * @param {int} id 
         * @param {string} label 
         * @returns void
         */
        onclick_addItem(id,label){
          
                this.repeatedItem = this.selectedItems.find((item)=>item.id==id)

                if (!this.repeatedItem){
                    
                    if(this.type==='multiSelect'){
                    this.selectedItems.push({"id":id, "label":label})
                    
                    }else{
                    this.singleSelectedItem = {"id":id, "label":label}
                    this.display = false;
                    }
                    

                }
                
        },


        /**
         * @method onclick_toggleClasses - displaying items, adding box-shadow to input after clicking on input element
         * @returns void
         */

        onclick_toggleClasses(){
            this.display = !this.display;
            this.hasShadow = !this.hasShadow;
        },
        set_items(){
            if(Array.isArray(this.items)){

                if(typeof this.items[0]=="object"){
                    //array of object
        
                    this.items.forEach((item)=>{
                        this.verifiedItems.push(item);
                    })
                }else{
                    //normal array
                    let i=0;
                    this.items.forEach((item)=>{
                        this.verifiedItems.push({id:i,label:item});
                        i++
                    })   
                }
            }else{
                //single object

                let j=0;
                let values = Object.values(this.items);

                values.forEach((value)=>{
                    this.verifiedItems.push({id:j,label:value})
                    j++
                })
            }
            return this.verifiedItems;
                   
        },
        check_selectedItem(id){
            let selected = false;
            selected = this.selectedItems.find((item)=>item.id==id)
            if(selected){
                return true
            }
        }

    },
    watch: {
        selectedItems: {
            handler(new_items,old_items){
            this.$emit('selected-item-change',new_items);
            },
            deep: true
        }

    },
    mounted(){
        document.addEventListener("click",(e)=>{
            //check select-option is open or not?
            if(this.display==true){
                if (!this.$refs.selectOption.contains(e.target)) {
                    this.display = !this.display;
                }
            }
           
        })
    },
    created(){
        this.verifiedItems = this.set_items();
    }


}
</script>