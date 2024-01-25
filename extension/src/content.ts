declare const chrome: any;

type PlayerElement = HTMLDivElement;
type PlayerData = {
  name: string | null,
  pronouns: string | null,
  commander: string | null,
  lifeTotal: number | null,
};

function getPlayerElements(): PlayerElement[] {
  return Array.from(
    document.querySelectorAll(
      'div.w-full.px-2.py-1.flex.items-center.bg-black-50.transition-colors.ease-in-out.duration-200'
    )
  );
}

function getPlayerCount(): number {
  return getPlayerElements().length;
}

function getPlayerNameElement(playerElement: PlayerElement): HTMLDivElement | null {
  return playerElement.querySelector('div.font-bold.truncate.leading-snug.text-sm');
}

function getPlayerName(playerElement: PlayerElement): string | null {
  return getPlayerNameElement(playerElement)?.innerHTML ?? null;
}

function getPlayerPronouns(playerElement: PlayerElement): string | null {
  return playerElement.querySelector('div.px-2.truncate.leading-snug.text-sm')?.innerHTML ?? null;
}

function getPlayerCommander(playerElement: PlayerElement): string | null {
  const element = playerElement.querySelector('div.text-xs.italic.text-gray-400.truncate.leading-snug.flex');
  const innerHTML = element?.innerHTML ?? null;
  if(innerHTML === "Click to add commander(s)") {
    return null;
  }
  return element?.querySelector('div')?.innerHTML ?? null;
}

function getPlayerLifeTotal(playerElement: PlayerElement): any {
  // TODO(ybabts): currently life total does not work, not sure why, look into it later
  return (playerElement.querySelector('input.bg-transparent.font-bold.text-center.select-auto.text-white.text-3x1') as HTMLInputElement | null)?.value
}

function getPlayerData() {
  const playerElements = getPlayerElements();
  const playerData = playerElements.map((playerElement) => {
    return {
      name: getPlayerName(playerElement),
      pronouns: getPlayerPronouns(playerElement),
      commander: getPlayerCommander(playerElement),
      lifeTotal: getPlayerLifeTotal(playerElement),
    };
  });
  return playerData;
}

function fetchPlayerData(playerName: string) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'fetchPlayerData', data: { playerName } }, (response: any) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  })
}
