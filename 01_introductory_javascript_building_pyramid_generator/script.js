const character='#';
const count=8;
const rows=[];
let inverted=false;
//return the number of character based on current rowNumber
function padRow(rowNumber,rowCount) {
    return (" ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber));
}
//push the returned character/ characters, on rows[] array
for (let i = 0; i <= count; i++) {
   if (inverted) {
    rows.unshift(padRow(i, count));
    //pushes the characters given by padRow(), to row[]
  } 
  else {
    rows.push(padRow(i, count));
  }  
}
let result="";
//iterates on rows[] one by one, assign the value on row variable
//each iterations, the new row will be inserted on next line of the existing rows.
for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);