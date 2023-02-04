import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";
import reporter from "../../helper/reporter.js";
import fs from "fs";
import nopcommerceCustlistPage from "../../page-objects/nopcommerce.custlist.page.js";

//#region inventory

// Then(
//   /^Inventory page should (.*)\s?list (.*)$/,
//   async function (negativeCheck, numOfProducts) {
//     // DEBUG: console.log(`>> Starting ${this.testid}...`);
//     // DEBUG: console.log(`>> The appid: ${this.appid}`);
//     try {
//       // console.log(wdio) //DEBUG: ReferenceError
//       if (!numOfProducts)
//         throw Error(`Invalid product count provided: ${numOfProducts}`);

//       let eleArr = await $$(`.inventory_item_name`);
//       chai.expect(eleArr.length).to.equal(parseInt(numOfProducts));
//     } catch (err) {
//       console.log(`>> The type of err: ${typeof err}`);
//       console.log(`>> The name property: ${err.name}`);

//       err.message = `${this.testid}: Failed when we have undefined element, ${err.message}`;
//       console.log(`>> The message property: ${err.message}`);
//       // throw err; // Failing the error
//       // logger.error(err.message); // report and move on
//     }
//   }
// );

// /**
//  * Steps:
//  * 1. Get price list
//  * 2. Convert string to number
//  * 3. Assert if any value is <= 0
//  */
// Then(/^Validate all products have valid price$/, async function () {
//   //DEBUG: logger.info(`${this.testid}: Checking the price...`);
//   reporter.addStep(this.testid, "info", "Checking the price...");
//   /**1. Get price list */
//   let eleArr = await $$(`.inventory_item_price`);
//   let priceStrArr = [];
//   for (let i = 0; i < eleArr.length; i++) {
//     let priceStr = await eleArr[i].getText();
//     priceStrArr.push(priceStr);
//   }
//   // DEBUG: console.log(`>> Price with $: ${priceStrArr}`);

//   /**2. Convert string to number */
//   let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
//   // DEBUG: console.log(`>> Price in numbers: ${priceNumArr}`);

//   /**3. Assert if any value is <= 0 */
//   let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
//   chai.expect(invalidPriceArr.length).to.equal(0);
// });

//#endregion

//#region E2E
/**
 * Verify if given user exists in customers list
 */
Then(/^Verify if all users exist in customers list$/, async function () {
  try {
    /** 1. Navigate/select Customer options from left menu */
    // @ts-ignore
    await browser.url(`${browser.options.nopCommerceBaseURL}/Admin/Customer/List`);
    reporter.addStep(
      this.testid,
      "info",
      `Navigated to customer list screen...`
    );

    /** 2. Read API reponse from /data folder */
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    let data = fs.readFileSync(filename, "utf8");
    let dataObj = JSON.parse(data);
    // DEBUG: console.log(`API data: ${JSON.stringify(dataObj)}`);

    /** 3. For each user object in API response */
    let numOfObj = dataObj.data.length;
    let arr = [];
    for (let i = 0; i < numOfObj; i++) {
      let obj = {};
      let firstname = dataObj.data[i].first_name;
      let lastname = dataObj.data[i].last_name;
      let custNotFound = await nopcommerceCustlistPage.searchNameAndConfirm(
        this.testid,
        firstname,
        lastname
      );
      if (custNotFound) {
        obj["firstname"] = firstname;
        obj["lastname"] = lastname;
        arr.push(obj);
      }
    }

    /** 4. In case user does not exist write it to error file */
    if (arr.length > 1) {
      let data = JSON.stringify(arr, undefined, 4);
      let filepath = `${process.cwd()}/results/custNotFoundList.json`;
      fs.writeFileSync(filepath, data);
    }
  } catch (err) {
    err.message = `${this.testid}: Failed at checking users in nopcommerce site, ${err.message}`;
    throw err;
  }
});
//#endregion
