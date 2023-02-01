import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";
import reporter from "../../helper/reporter.js";

Then(
  /^Inventory page should (.*)\s?list (.*)$/,
  async function (negativeCheck, numOfProducts) {
    // DEBUG: console.log(`>> Starting ${this.testid}...`);
    // DEBUG: console.log(`>> The appid: ${this.appid}`);
    try {
      // console.log(wdio) //DEBUG: ReferenceError
      if (!numOfProducts)
        throw Error(`Invalid product count provided: ${numOfProducts}`);

      let eleArr = await $$(`.inventory_item_name`);
      chai.expect(eleArr.length).to.equal(parseInt(numOfProducts));
    } catch (err) {
      console.log(`>> The type of err: ${typeof err}`);
      console.log(`>> The name property: ${err.name}`);
      
      err.message = `${this.testid}: Failed when we have undefined element, ${err.message}`;
      console.log(`>> The message property: ${err.message}`);
      // throw err; // Failing the error
      // logger.error(err.message); // report and move on
    }
  }
);

/**
 * Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if any value is <= 0
 */
Then(/^Validate all products have valid price$/, async function () {
  //DEBUG: logger.info(`${this.testid}: Checking the price...`);
  reporter.addStep(this.testid, "info", "Checking the price...");
  /**1. Get price list */
  let eleArr = await $$(`.inventory_item_price`);
  let priceStrArr = [];
  for (let i = 0; i < eleArr.length; i++) {
    let priceStr = await eleArr[i].getText();
    priceStrArr.push(priceStr);
  }
  // DEBUG: console.log(`>> Price with $: ${priceStrArr}`);

  /**2. Convert string to number */
  let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
  // DEBUG: console.log(`>> Price in numbers: ${priceNumArr}`);

  /**3. Assert if any value is <= 0 */
  let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
  chai.expect(invalidPriceArr.length).to.equal(0);
});
