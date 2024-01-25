const ENV = 'preproduction';

const apiEndpoint = "";

type Message = {
  action: string,
  data: any
}

// chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
//   if(message.action === "fetchPlayerData") {
//     const { playerName } = message.data;
//     console.log('fetchPlayerData', playerName)
//     fetch(`${apiEndpoint}/player/${playerName}`, {
//       method: 'GET',
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         sendResponse(data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }
// });

setInterval(() => {
  console.log('hello')
}, 1000)