// Utility to map data files to object
function loadTreeData(version) {
  const treeData = {
    Attack: require(`./v${version}/Attack.json`),
    Archer: require(`./v${version}/Archer.json`),
    Conquering: require(`./v${version}/Conquering.json`),
    Defense: require(`./v${version}/Defense.json`),
    Garrison: require(`./v${version}/Garrison.json`),
    Infantry: require(`./v${version}/Infantry.json`),
    Leadership: require(`./v${version}/Leadership.json`),
    Peacekeeping: require(`./v${version}/Peacekeeping.json`),
    Skill: require(`./v${version}/Skill.json`),
    Support: require(`./v${version}/Support.json`),
    Versatility: require(`./v${version}/Versatility.json`)
  };

  if (process.env.NODE_ENV === 'development') {
    console.info(`Info: Loading game data version ${version}`);
  }

  return treeData;
}

export default loadTreeData;
