/* jshint esversion:6 */

utils = require('utils');

var roleTower = {

  _init: function(room) {
    var myTowers = roleTower.towers(room);
    if (myTowers.length > 0) {
      for (var t in myTowers) {
        var tower = myTowers[t];
        roleTower.towerControl(tower);
      }
    }
  },

  towers: function(room){
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_TOWER;
      }
    });
  },

  towerControl: function(tower) {
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS),
      closestDamagedStructure = tower.pos.findClosestByRange(
        FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax
        });

    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }
};

module.exports = roleTower;
