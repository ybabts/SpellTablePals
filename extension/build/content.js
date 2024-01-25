function getPlayerElements() {
  return Array.from(document.querySelectorAll("div.w-full.px-2.py-1.flex.items-center.bg-black-50.transition-colors.ease-in-out.duration-200"));
}
function getPlayerCount() {
  return getPlayerElements().length;
}
function getPlayerNameElement(playerElement) {
  return playerElement.querySelector("div.font-bold.truncate.leading-snug.text-sm");
}
function getPlayerName(playerElement) {
  return getPlayerNameElement(playerElement)?.innerHTML ?? null;
}
function getPlayerPronouns(playerElement) {
  return playerElement.querySelector("div.px-2.truncate.leading-snug.text-sm")?.innerHTML ?? null;
}
function getPlayerCommander(playerElement) {
  const element = playerElement.querySelector("div.text-xs.italic.text-gray-400.truncate.leading-snug.flex");
  const innerHTML = element?.innerHTML ?? null;
  if (innerHTML === "Click to add commander(s)") {
    return null;
  }
  return element?.querySelector("div")?.innerHTML ?? null;
}
function getPlayerLifeTotal(playerElement) {
  return playerElement.querySelector("input.bg-transparent.font-bold.text-center.select-auto.text-white.text-3x1")?.value;
}
function getPlayerData() {
  const playerElements = getPlayerElements();
  const playerData = playerElements.map((playerElement) => {
    return {
      name: getPlayerName(playerElement),
      pronouns: getPlayerPronouns(playerElement),
      commander: getPlayerCommander(playerElement),
      lifeTotal: getPlayerLifeTotal(playerElement)
    };
  });
  return playerData;
}
function fetchPlayerData(playerName) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "fetchPlayerData", data: { playerName } }, (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}
setInterval(() => {
  console.log("fuck");
}, 1e3);
