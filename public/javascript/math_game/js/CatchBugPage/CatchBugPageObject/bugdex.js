export const BugDex = {
  GoldenBug: 0,
  IceBug: 0,
  FireBug: 0
}
export const bugRandom = () => {
  let random = Math.floor(Math.random() * 6);
  if (random === 0) {
    BugDex.IceBug++;
    return 'IceBug';
  } else if (random >= 1 && random <= 3) {
    BugDex.FireBug++;
    return 'FireBug';
  } else {
    BugDex.GoldenBug++;
    return 'GoldenBug';
  }
}
