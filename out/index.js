"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var csv_parse_1 = require("csv-parse");
var drugInfos = [];
var csvFilePath = path.resolve(__dirname, "../drug-info.csv");
var drugInfoHD = ["supplierPID", "name", "ingredients", "hkregNo"];
var fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
fileContent.toString();
console.log(typeof fileContent);
var p = new Promise(function (res, rej) {
    return (0, csv_parse_1.parse)(fileContent, {
        delimiter: ",",
        columns: drugInfoHD,
        fromLine: 2,
    }, function (error, drugInfo) {
        for (var i = 0; i < drugInfo.length; i++) {
            var newDrugInfo = drugInfo[i];
            newDrugInfo.ingredients = newDrugInfo.ingredients.replace(/[\r\n]/gm, "");
            // turning string into string[]
            drugInfos.push(newDrugInfo);
        }
        res();
        if (error) {
            console.error(error);
            rej();
        }
    });
});
p.then(function () {
    drugInfos.forEach(function (DI) {
        DI.ingredients = DI.ingredients.split("﹑");
    });
}).then(function () {
    drugInfos.forEach(function (DI) {
        var beginning = '{"name": "';
        for (var i = 0; i < DI.ingredients.length; i++) {
            DI.ingredients[i] = beginning.concat(DI.ingredients[i]);
            DI.ingredients[i] = DI.ingredients[i].replace('（', '", "quantity": ');
            DI.ingredients[i] = DI.ingredients[i].replace('）', '');
            DI.ingredients[i] = DI.ingredients[i].replace(/克$/, ',"unit": "克"}');
            DI.ingredients[i] = DI.ingredients[i].replace(/両$/, ',"unit": "両"}');
            DI.ingredients[i] = DI.ingredients[i].replace(/參$/, ',"unit": "參"}');
            DI.ingredients[i] = DI.ingredients[i].replace(/鐖$/, ',"unit": "鐖"}');
        }
    });
}).then(function () {
    drugInfos.forEach(function (DI) {
        for (var i = 0; i < DI.ingredients.length; i++) {
            var x = JSON.parse(DI.ingredients[i]);
            x.unit = "gram";
            DI.ingredients[i] = x;
        }
    });
}).then(function () {
    fs.writeFile("testing.json", JSON.stringify(drugInfos), function (err) {
        if (err)
            throw err;
        console.log("complete");
    });
    // drugInfos.forEach((DI)=> {
    //   console.log(DI); 
    //   console.log(",");
    // })
}).catch(function () {
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
//# sourceMappingURL=index.js.map