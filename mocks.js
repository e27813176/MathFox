var path_prefix = '/';

const Analytics = {
  send_ga_event: function (param1, param2, param3) {
    console.log(param1, param2, param3);
  }
}
const globalUser = {
  email: '123@foxmail.com',
  nickname: 'MathFox'
}
function getPassedStageIDList() {
  const PageList = ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage'];
  let list = PageList.filter((page, i) => i < 5);
  return list
}
