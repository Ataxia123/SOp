// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";

/// # Character System

import { Players, PlayersData } from "../codegen/Tables.sol";

contract CharacterSystem is System {
  function addCharacter(string memory name, string memory level) public {
    // if token id already exists do not create again
    bytes32 id = getUniqueEntity();
    // bytes32 owner = _msgSender(); //TODO: Fix formating for ownership

    Players.set(id, PlayersData({ name: name, level: level }));
  }
}
