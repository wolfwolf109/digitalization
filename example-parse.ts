// const csvFilePath = path.resolve(__dirname, '../../bin/ingredient.csv');
    // const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // let data: Ingredient[] = [];

    // parse(
    //     fileContent,
    //     {
    //         delimiter: ',',
    //     },
    //     async (error, result: string[]) => {
    //         for (let i = 0; i < result.length; i++) {
    //             const newIngredient = orm.em.create(Ingredient, { name: result[i][0] });
    //             data.push(newIngredient);
    //         }
    //         await orm.em.persistAndFlush(data);
    //         if (error) {
    //             console.error(error);
    //         }
    //     },
    // );

    // await orm.em.flush();

    //     let DrugInfoData: DrugInfo[] = [];
//     let DrugInfoIngData: DrugInfoIngredient[] = [];

//     const drugInfos = require('../../bin/drugInfo.json');

//     for (const drugInfo of drugInfos){
//         let newDrugInfo: DrugInfo = orm.em.create(DrugInfo, {
//             name: drugInfo.name,
//             supplier: '海天',
//             supplierPID: drugInfo.supplierPID,
//             hkregNo: drugInfo.hkregNo,
//             net: 100,
//         });

//         DrugInfoData.push(newDrugInfo);
//         await orm.em.persistAndFlush(DrugInfoData);
//     }


//     for (let i = 0; i < drugInfos.length; i++) {
//         for (const ingredient of drugInfos[i].ingredients) {
//             let newDrugInfoIng: DrugInfoIngredient = orm.em.create(DrugInfoIngredient, {
//                 quantity: ingredient.quantity,
//                 unit: UnitType.gram,
//                 drugInfo: DrugInfoData[i].id,
//                 ingredient: await orm.em.findOne(Ingredient, { name: ingredient.name }, { populate: ['drugInfoIngredient'] }),
//             });

//             DrugInfoIngData.push(newDrugInfoIng);
//             await orm.em.persistAndFlush(DrugInfoIngData);
//         }
//     }

//     await orm.em.flush();

