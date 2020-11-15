export default {
    //保证整个项目只有一个socket是咧
    ws: null,
    init(config, onMessage, onError) {
        if (!this.ws) {
            //实例化socket对象
            this.ws = new WebSocket(`ws://localhost:5000/${config.user.id}`);
        }


        //客户端接收消息
        this.ws.onmessage = event => {
            let message = JSON.parse(event.data);
            onMessage && onMessage(message); //接收到消息触发的回调
        }

        //出错
        this.ws.onerror = error => {
            onError && onError(error);
        };

        this.ws.onclose = () => {
            this.ws = null
        }
    },

    //发送消息
    send(msgObj) {
        //发送消息的时候触发
        this.ws.send(JSON.stringify(msgObj))
    }

}