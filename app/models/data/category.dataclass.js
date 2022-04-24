const db = require("../../models");

const categoryTree = {
  Garment: {
    Men: {
      HK_style: 0,
      Korean_style: 0,
      endOfObject: 1
    },
    Women: {
      HK_style: 0,
      endOfObject: 1
    },
    endOfObject: 1
  },
  Gift: {
    Flower: 0,
    Phone_accessories: 0,
    endOfObject: 1
  },
  Food: {
    Blog: 0,
    Cake: 0,
    endOfObject: 1
  },
  Entertainment: {
    Dynamic: {
      Flower: 0,
      Ceramics: 0,
      endOfObject: 1
    },
    Static: {
      Wakesurf: 0,
      Roller_skate: 0,
      endOfObject: 1
    },
    endOfObject: 1
  }
};


exports.syncCategoryTree = (db) => {
  var allCombinations = [];

  loopThroughJSON = (jsonObject, pathArray) => {
    for (let categoryNth in jsonObject) {
      if (typeof jsonObject[categoryNth] == "object") {
        pathArray.push(categoryNth)
        loopThroughJSON(jsonObject[categoryNth], pathArray);
      } else if (typeof jsonObject[categoryNth] == "number" && categoryNth !== 'endOfObject') {
        const clonePathArray = [...pathArray];
        clonePathArray.push(categoryNth);
        for (let i = 0; i<3-clonePathArray.length; i++) {clonePathArray.push('null')}
        allCombinations.push(clonePathArray);
        console.log(clonePathArray);
      }
      if (categoryNth === 'endOfObject') {
        pathArray.pop()
      }
    }
  }
    loopThroughJSON(categoryTree, [])
    allCombinations.forEach(eachCombination => {
      db.Category_combination.create({
        category1_name: eachCombination[0],
        category2_name: eachCombination[1],
        category3_name: eachCombination[2]
      })
        .catch(err => {
          console.log(err.message)
        })
    })

    return 

}


// [categoryTree].forEach(category1 => {console.log(category1)});
// [].slice.call(categoryTree).forEach(category1 => {
//     console.log(category1);
//   })