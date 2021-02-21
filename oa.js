// // 要求写一个functionInput是两个array第一个是wordlist里面是不定数的string每个string有至少5个characters第二个是keypads里面也是不定数的string每个string7个characterOutput是一个array里面是integer代表了用keypads里面的string能produce多少个wordlist里面的string有一个条件是如果keypads的string的第一个character在wordlist的string里面没有的话这个keypad对于这个word就不valid了Constraint是timecomplexity因为有两个testcase会包括10000个stringLZ没有optimize下面的solution要run9772ms

// const escape = (wordlist, keypads) => {
    // let newWordList = [];
    // for (let i = 0; i < wordlist.length; i++) {
    //     let arr1 = wordlist[i].split("");
    //     let newWord = arr1.filter((v, i, a) => a.indexOf(v) === i);
    //     newWord.sort();
    //     newWordList = [...newWordList, newWord]
    // }
    // let newKeyPads = [];
    // for (let j = 0; j < keypads.length; j++) {
    //     let newKeyPad = keypads[j].split("");
    //     newKeyPads = [...newKeyPads, newKeyPad]
    // }
    // let output = [];
    // for (let k = 0; k < newKeyPads.length; k++) {
    //     let counter = 0;
    //     for (let l = 0; l < newWordList.length; l++) {
    //         let valid = newWordList[l].includes(newKeyPads[k][0]);
    //         let match = newWordList[l].every( ai => newKeyPads[k].includes(ai) )
    //         if (valid && match) {
    //             counter ++ 
    //         }
    //     }
    //     output = [...output, counter]
    // }
    // return output
// }

// // solution 2 (not right) (但是他说这里面差了个and/orstatement所以是不对的我没有看懂他的solution)
// let wordList = ['APPLE', 'PLEAS', 'PLEASE'];
// let keypads = ['AELWXYZ', 'AELPXYZ', 'AELPSXY', 'SAELPRT', 'XAEBKSY'];
// //expected 0 1 3 2 0
// escapeRoomKeypads(wordList, keypads)

// function escapeRoomKeypads(wordList, keypads) {
//   //creates a set obj for all words but the first
//   let commonList = createCommonList(wordList);
//   let firstWord = new Set();
//   for (let i = 0; i < wordList[0]; i++) {
//     let curr = wordList[0][i];
//     if(!commonList.has(curr)) {
//       firstWordSet.add(curr);
//     }
//   }
//   wordList[0] = firstWord;
//   return keypads.map((keypad) => {
//     let total = 0;
//     for (let i = 0; i < wordList.length; i++) {
//       if(commonList.has(keypad[0]) || wordList[i].has(keypad[0])) {
//         if(hasAllChars(commonList, keypad) && hasAllChars(wordList[i], keypad)) {
//           total++;
//         }
//       }
//     }
//     return total;
//   })
// }

// function hasAllChars(wordList, keypads) {
//   let count = 0;
//   for (let i = 0; i < keypads.length; i++) {
//     let curr = keypads[i];
//     if(wordList.has(curr)) {
//       count++;
//     }
//   }
//   return wordList.size === count;
// }

// function createCommonList(wordList) {
//   let common = new Set();
//   for (let i = 0; i < wordList.length; i++) {
//     let newCommon = new Set();
//     let unique = new Set();
//     for (let j = 0; j < wordList[i].length; j++) {
//       let curr = wordList[i][j];
//       if(i === 0) {
//         common.add(curr);
//       } else {
//         if(common.has(curr)) {
//           newCommon.add(curr);
//         } else {
//           unique.add(curr);
//         }
//       }
//     }
//     if(i > 0) {
//       common = newCommon;
//       wordList[i] = unique;
//     }
//   }
//   return common
// }

// my solution

let wordList = ['APPLE', 'PLEAS', 'PLEASE'];
let keyPads = ['AELWXYZ', 'AELPXYZ', 'AELPSXY', 'SAELPRT', 'XAEBKSY'];

const myEscapeRoomKeypads = (wordList, keyPads) => {
  let wordSetAnsArrayMap = new Map();
  

  let finalAnsArr = new Array(keyPads.length).fill(0);

  for(let i =0; i < wordList.length; i++){
    
    let sortedEachWord = wordList[i].split("").sort().join("");
    let noDuplicateWord = "";
    for(let j = 0; j < sortedEachWord.length; j++){
      if(j===0){
        noDuplicateWord = sortedEachWord[0];
      }else if(j>0 && sortedEachWord[j] !== sortedEachWord[j-1]){
        noDuplicateWord += sortedEachWord[j];
      }
    }

    canMakeForEachWord(noDuplicateWord, keyPads, wordSetAnsArrayMap);

    let ansArr = wordSetAnsArrayMap.get(noDuplicateWord);

    for(let k = 0; k < ansArr.length; k++){
      finalAnsArr[k] += ansArr[k];
    }
  }
  console.log(finalAnsArr);
  return finalAnsArr;

}

const canMakeForEachWord = (noDuplicateWord, keyPads, wordSetAnsArrayMap) => {
  let ansArray = [];
  let firstLetterMap = new Map();

  // skip if the sortedEachWord in there already
  if(wordSetAnsArrayMap.has(noDuplicateWord)){

    return;

  }else{

    for(let i = 0; i < keyPads.length; i++){
      
      // check first letter, skip the keypad if first letter is not in the noDuplicateWord or the noDuplicateWord length is larger than 7
      // if(!noDuplicateWord.includes(keyPads[i][0]) || noDuplicateWord.length > 7){
      //   ansArray[i] = 0;
      //   continue;
      // }
            
      if(!firstLetterMap.has(keyPads[i][0])){
          if(!noDuplicateWord.includes(keyPads[i][0])){
              ansArray[i] = 0;
              firstLetterMap.set(keyPads[i][0], false);
              continue;
          }else{
              firstLetterMap.set(keyPads[i][0], true);
          }
      }
      
      if(firstLetterMap.has(keyPads[i][0]) && firstLetterMap.get(keyPads[i][0]) === false){
          ansArray[i] = 0;
          continue;
      }
      
      if(noDuplicateWord.length >7){
          ansArray[i] = 0;
          continue;
      }
      
      // check if keypad can make the given noDuplicateWord- in wordList
      let sortedKeyPadWord = keyPads[i].split("").sort().join("");
      let n =0;
      let m =0;
      while(true){
        if(sortedKeyPadWord[m] === noDuplicateWord[n]){
          m++;
          n++;
          if(n === noDuplicateWord.length){
            ansArray[i] = 1;
            break
          }
        }else{
          m++;
          if(m === keyPads[i].length){
            ansArray[i] = 0;
            break;
          }
        }
      }
    }
  }
  wordSetAnsArrayMap.set(noDuplicateWord, ansArray);
  return;
}

myEscapeRoomKeypads(wordList, keyPads);
// let newMap = new Map();
// canMakeForEachWord("AELPS", keyPads, newMap);

// let str1 = "ELPS"
// let str2 = "AELPRST"
// console.log(str2.includes("S"))