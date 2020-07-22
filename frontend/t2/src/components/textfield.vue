<template>
    <div>
        <div class="form-group">
            <label id="${options.type}-label-${options.id}" class="jcomponent-label ${options.type}-label" for="${options.type}-input-${options.id}">{{options.label}}</label>
            <input class="form-control jcomponent-input" v-model="displayValue" @change="changeEvent" type="text" aria-describedby="${options.type}-small-${options.id}" :placeholder="options.placeholder" autocomplete="off"/>
            <small class="form-text text-muted jcomponent-small ${options.type}-small">{{options.description}}</small>
        </div>
    </div>
</template>

<script>
    export default {
        name: "jTextField",
        props: {"options": {
                type: Object
            }, "value": {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                displayValue: this.value
            }
        },
        computed: {
        },
        methods: {
            changeEvent() {
                console.log(this.displayValue + " bran")
                this.$emit("change", {
                        value: this.displayValue,
                        id: this.options.id
                    })
            }
        },
        watch: {
            value: function() {
                this.displayValue = this.value;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>