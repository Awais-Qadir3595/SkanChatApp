
import axios from "axios";



const SendNotification = async (token, message, title) => {


  var myHeaders = new Headers();
  myHeaders.append("Authorization", "key=AAAA-cn1wGA:APA91bF6oHCQaEwr_oq-JTFbtVUXeQZ9zd0JI-KwMbMtmXzbuu6agdXNQYzxOANRFxvd1jLvawTNKDf-fzhqWHjC4r2aubVsvED2XESGBnyKj7rD7H9iedF3BiHKUcrnfJz26Fo072Ek");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // "to": "fatJn1ZpSkajGbZjavw4Dj:APA91bHC6Tss9TeNQfn7WosWtOpgsV0W015oiMpKSe9JZMBHc3bWAjHfTHZ0xhvzs9P074-la069gzCFpWSu73SQ0QGAS-eIr0uhw59i3cYAFCeHllzHrnbwIuoJxmQdGfPyJgNIwA65",
    "to": token,
    "notification": {
      "body": message,
      "title": title
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  console.log('yuppppppp');
}
export default SendNotification;