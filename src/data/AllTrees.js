// Utility to map data files to object
function loadTreeData(version) {
  const treeData = {
    Attack: require(`./v${version}/Attack.json`),
    Archer: require(`./v${version}/Archer.json`),
    Cavalry: require(`./v${version}/Cavalry.json`),
    Conquering: require(`./v${version}/Conquering.json`),
    Defense: require(`./v${version}/Defense.json`),
    Garrison: require(`./v${version}/Garrison.json`),
    Gathering: require(`./v${version}/Gathering.json`),
    Infantry: require(`./v${version}/Infantry.json`),
    Integration: require(`./v${version}/Integration.json`),
    Leadership: require(`./v${version}/Leadership.json`),
    Mobility: require(`./v${version}/Mobility.json`),
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
