export const SendGA = (stage, date) => {
  let jsonData = JSON.stringify(date);
  Analytics.send_ga_event('game', stage, jsonData);
}
// === test ===
const Analytics = {
  send_ga_event: function (param1, param2, param3) {
    console.log(param1, param2, param3);
  }
}
