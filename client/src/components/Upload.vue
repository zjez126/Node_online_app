<template>
<div class="img_wrap">
    <div v-if="showFileData.length > 0">
        <div class="isImg" v-for="(item,index) in showFileData" :key="index">
            <img :src="item" alt="">
            <button v-show="!loading" @click="removeImg(item)" class="remove"> ×</button>
        </div>
    </div>

    <div class="isImg img_upload" v-if="showFileData.length < 9">
        <button class="btn_upload">
            <input @change="addFile" type="file" ref="myFile" multiple="multiple" accept="img/*">
        </button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            //存放图片url的数组
            showFileData: [],
            //文件上传files
            allUploadFiles: []
        }
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        addFile() {
            // console.log(this.$refs.myFile.files)
            let files = [...this.$refs.myFile.files];

            if (this.showFileData.length + files.length > 9) {
                this.$message({
                    center: true,
                    message: '最多发表9张图片',
                    type: 'warning'
                });
                return;
            }

            files.forEach(file => {
                this.allUploadFiles.push(file)
                let Objurl = this.getObjectUrl(file);
                this.showFileData.push(Objurl)
            })
            //注册事件，让调用方调用
            this.$emit("getImgs", this.allUploadFiles)
        },
        getObjectUrl(file) {
            // 获取文件url
            let url = null;
            if (window.createObjectURL != undefined)
                url = window.createObjectURL(file);
            else if (window.URL != undefined) url = window.URL.createObjectURL(file);
            else if (window.webkitURL != undefined)
                url = window.webkitURL.createObjectURL(url);
            return url;
        },
        removeImg(item) {
            this.showFileData.forEach((file, index) => {
                if (file == item) {
                    this.showFileData.splice(index, 1)
                }
            })
        }
    }
}
</script>

<style scoped>
.isImg {
    box-sizing: border-box;
    width: 30%;
    height: 6rem;
    float: left;
    margin-right: 8px;
    margin-bottom: 8px;
    position: relative;
}

.btn_upload {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: url(../assets/upload.png) no-repeat;
    background-size: 100% 100%;
}

.btn_upload input {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.isImg img {
    width: 100%;
    height: 100%;
}

.isImg .remove {
    position: absolute;
    top: -8px;
    right: -5px;
    border: none;
    outline: none;
    width: 20px;
    height: 20px;
    padding: 0;
    text-align: center;
    color: white;
    background-color: #3baffd;
    line-height: 10px;
    border-radius: 50%;
}
</style>
