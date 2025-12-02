<template>
        <div class="modal">
            <div class="modal-content">
                <!----------|modal-header|-->
                <div class="modal-header">
                    <span>save</span>
                    <button  @click="onclickCloseModal">X</button>
                </div>

                <!----------|modal-body|-->
                <div class="modal-body">
                    <span>Enter the form name to save it.</span>
                    <input type="text"  v-model="formName" value="" placeholder="Form name">
                </div>


                <!----------|modal-foot|-->
                <div class="modal-foot">
                    <ul class="buttons">
                        <li><button @click="onclickCloseModal">cancle</button></li>
                        <li><button @click="onclickDeleteItem" class="green-btn">save</button></li>
                    </ul>
                </div>
            </div>
        </div>
    


</template>

<script>
    export default{       

        data(){
            return{
               formName:""
            }
        },
        methods:{
            onclickCloseModal(){
                this.$emit("closeModal")
            },
            onclickDeleteItem(){
                this.$emit("saveBtnClicked",this.formName)
            }
        }
    }
</script>