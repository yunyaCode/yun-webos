import emoji_01 from './emoji_01';
import emoji_02 from './emoji_02';
import emoji_03 from './emoji_03';
import emoji_04 from './emoji_04';
import emoji_05 from './emoji_05';
import emoji_06 from './emoji_06';
import emoji_07 from './emoji_07';
import emoji_08 from './emoji_08';
import emoji_09 from './emoji_09';
import emoji_10 from './emoji_10';
import emoji_11 from './emoji_11';
import emoji_12 from './emoji_12';
import emoji_13 from './emoji_13';
import emoji_14 from './emoji_14';
import emoji_15 from './emoji_15';
import emoji_16 from './emoji_16';
import emoji_17 from './emoji_17';
import emoji_18 from './emoji_18';
import emoji_19 from './emoji_19';
import emoji_20 from './emoji_20';
import emoji_21 from './emoji_21';
import emoji_22 from './emoji_22';
export const text2emoji = (string, emoji) => {
  if (!string) return;
  let newValue = string;
  for(let emo of emoji){
    let key = "["+emo.name+"]";
    let svg = "<u class='icon'>"+emo.svg+"</u>";
    while(newValue.indexOf(key)+1) {
      let index =newValue.indexOf(key),
        len = key.length,
        str1 = newValue.substr(0, index),
        str2 = newValue.substr(index+len);
      newValue = str1 +svg+ str2;
    }
  }
  newValue=newValue.replace(/\n/g,"<br/>");
  return newValue;
};
export const emoji = [
  {name: "眨眼", svg: emoji_01},
  {name: "大笑", svg: emoji_02},
  {name: "难过", svg: emoji_03},
  {name: "微笑", svg: emoji_04},
  {name: "吐舌", svg: emoji_05},
  {name: "酷", svg: emoji_06},
  {name: "惊讶", svg: emoji_07},
  {name: "坏笑", svg: emoji_08},
  {name: "沮丧", svg: emoji_09},
  {name: "大哭", svg: emoji_10},
  {name: "害羞", svg: emoji_11},
  {name: "色", svg: emoji_12},
  {name: "恶魔", svg: emoji_13},
  {name: "天使", svg: emoji_14},
  {name: "疑惑", svg: emoji_15},
  {name: "闭嘴", svg: emoji_16},
  {name: "认真", svg: emoji_17},
  {name: "撇嘴", svg: emoji_18},
  {name: "调皮", svg: emoji_19},
  {name: "吐", svg: emoji_20},
  {name: "赞", svg: emoji_21},
  {name: "弱", svg: emoji_22}];
