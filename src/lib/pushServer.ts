import Pusher from "pusher"

const pusher = new Pusher({
  appId: "1818541",
  key: "b34fe7139c47c18d7a11",
  secret: "ec4714509d50b45ef745",
  cluster: "us2",
  useTLS: true
});



export {pusher}