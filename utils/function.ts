

export const updateGradeLevel = (level : string) => {
    switch(level){
        case "1st year": return "2nd year" ; break
        case "2nd year": return "3rd year" ; break
        case "3rd year": return "4th year" ; break
        case "4th year": return "5th year" ; break
        default :  return "404 year" ; break
    }
}   



export function haveSameItems(arr1 : string[], arr2 : string[]) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every(item => arr2.includes(item));
}