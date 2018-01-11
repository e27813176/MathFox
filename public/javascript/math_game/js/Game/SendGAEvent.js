import Analytics from 'Analytics';

export const SendGA = (stage, date) => {
  let jsonData = JSON.stringify(date);
  Analytics.send_ga_event('game', stage, jsonData);
}
