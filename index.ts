import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

type DrugInfoIngredient = {
  name: string;
  quantity: number;
  unit: string;
};

type DrugInfo = {
  supplierPID: string;
  name: string;
  ingredients: string | DrugInfoIngredient[] | string[];
  hkregNo: string;
};


const drugInfos: DrugInfo[] = [];

const csvFilePath = path.resolve(__dirname, "../drug-info.csv");

const drugInfoHD = ["supplierPID", "name", "ingredients", "hkregNo"];

const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
fileContent.toString();
console.log(typeof fileContent);

let p = new Promise<void>((res, rej) =>
  parse(
    fileContent,
    {
      delimiter: ",",
      columns: drugInfoHD,
      fromLine: 2,
    },
    (error, drugInfo: DrugInfo[]) => {
      for (let i = 0; i < drugInfo.length; i++) {
        let newDrugInfo = drugInfo[i];
        newDrugInfo.ingredients = (newDrugInfo.ingredients as string).replace(
          /[\r\n]/gm,
          ""
        );
        // turning string into string[]
        drugInfos.push(newDrugInfo);
      }
      res();
      if (error) {
        console.error(error);
        rej();
      }
    }
  )
);

p.then(() => {
  drugInfos.forEach((DI) => {
    DI.ingredients = (DI.ingredients as string).split("﹑");
  }); 
}).then(()=>{
  drugInfos.forEach((DI)=> {
    let beginning = '{"name": "';
    for (let i=0; i < DI.ingredients.length; i++){
      (DI.ingredients[i] as string) = beginning.concat( (DI.ingredients[i] as string));
      (DI.ingredients[i] as string) = (DI.ingredients[i] as string).replace('（', '", "quantity": ');
      (DI.ingredients[i] as string) = (DI.ingredients[i] as string).replace('）', '');
      (DI.ingredients[i] as string) = (DI.ingredients[i] as string).replace(/克$/, ',"unit": "克"}');
      (DI.ingredients[i] as string) = (DI.ingredients[i] as string).replace(/両$/, ',"unit": "両"}');
      (DI.ingredients[i] as string) = (DI.ingredients[i] as string).replace(/參$/, ',"unit": "參"}');
      (DI.ingredients[i] as string) = (DI.ingredients[i] as string).replace(/鐖$/, ',"unit": "鐖"}');
    }
  })
}).then(()=>{
  drugInfos.forEach((DI)=> {
    for (let i=0; i < DI.ingredients.length; i++){
      let x: DrugInfoIngredient = JSON.parse(DI.ingredients[i] as string);
      x.unit = "gram";

      (DI.ingredients[i] as DrugInfoIngredient) = x;
    }
  })
}).then(()=>{
  fs.writeFile("testing.json", JSON.stringify(drugInfos), function(err){
    if (err) throw err;
    console.log("complete");
    
  })

  // drugInfos.forEach((DI)=> {
  //   console.log(DI); 
  //   console.log(",");
  // })
}).catch(() => {
  console.log("ERROR");
});



// parse(
//   x,
//   {
//     delimiter: "﹑",
//   },
//   (error, ingredient: string[]) => {
//     let y = ingredient;
//     x = y[0];
//     //console.log(i);
//     //console.log(x);

//     for (let k = 0; k < x.length; k++) {
//       let z = x[k].replace("）", "");
//       z = z.replace("（", ",");
//       z = z.replace(/克$/, ",克");
//       z = z.replace(/両$/, ",両");
//       z = z.replace(/參$/, ",參");
//       z = z.replace(/鐖$/, ",鐖");

//       parse(
//         z,
//         { delimiter: [","], columns: ingredientsHD },
//         (error, inn: DrugInfoIngredient) => {
//           let foo = inn;

//           let q: number = +foo[0].quantity
//           Object.assign(foo[0], {quantity: q})

//           gg[k] = foo[0];
//           console.log(k);

//           console.log(gg[k]);

//           if (error) {
//             console.error(error);
//           }
//         }
//       );
//     }
//     newDrugInfo.ingredients = gg

//     //Object.assign(newDrugInfo.ingredients, gg)
//     console.log(newDrugInfo.ingredients);

//     if (error) {
//       console.error(error);
//     }
//   }
// );
