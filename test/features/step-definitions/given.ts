import { Given } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter.js";
import sauceHomePage from "../../page-objects/sauce.home.page.js";
import constants from "../../../data/constants.json" assert { type: "json" };
import apiHelper from "../../helper/apiHelper.js";
import fs from "fs";

//#region Regular Way Implementation
// Given(
//   /^As (a|an) (.*) user I login to inventory web app$/,
//   async function (prefixTxt, userType, dataTable) {
//     // DEBUG: console.log(`Test username: ${process.env.TEST_STD_USERNAME}`);
//     // DEBUG: let dt = dataTable.hashes();
//     // DEBUG: console.log(`>> The type of dt: ${typeof dt.constructor}`);
//     // DEBUG: console.log(`>> The value of dt: ${JSON.stringify(dt)}`);
//     // DEBUG: console.log(`>> The userType: ${userType}`);
//     // DEBUG: console.log(`>> Given step Test ID: ${this.testid}`);
//     reporter.addStep(this.testid, "info", "Login to sauce demo");
//     // DEBUG: logger.info(`${this.testid}: Started to login sauce demo app...`);
//     // DEBUG: allure.addStep(`${this.testid}: Started to login sauce demo app...`);
//     /** 1. Launch browser */
//     // @ts-ignore
//     await browser.url(browser.options.sauceDemoURL);
//     // DEBUG: console.log(`>> Test config values: ${JSON.stringify(browser.options)}`);

//     await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
//     await browser.maximizeWindow();

//     /** 2. Login to inventory */
//     try {
//       await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
//       await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
//       await $(`#login-button`).click();
//     } catch (err) {
//       console.log(`Error in first login. Retrying...`);
//       await browser.refresh();
//       await browser.pause(2000);
//       await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
//       await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
//       await $(`#login-button`).click();
//     }
//     this.appid = "Test World Obj";
//     //DEBUG: logger.info(`${this.testid}: login is successful...`);
//     //DEBUG: allure.addStep(`${this.testid}: login is successful...`);
//     reporter.addStep(this.testid, "debug", "login is successful...");
//   }
// );

//#endregion

//#region Page-Object Implementation
// Given(
//   /^As (a|an) (.*) user I login to inventory web app$/,
//   async function (prefixTxt, userType, dataTable) {
//     try {
//       reporter.addStep(this.testid, "info", "Login to sauce demo");
//       //@ts-ignore
//       await sauceHomePage.navigateTo(browser.options.sauceDemoURL);
//       await sauceHomePage.loginToSauceApp(
//         this.testid,
//         process.env.TEST_STD_USERNAME,
//         process.env.TEST_STD_PASSWORD
//       );
//     } catch (err) {
//       err.message = `Failed at login step, ${err.message}`;
//     }
//   }
// );
//#endregion

//#region End-To-End Test
/**
 * Get list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef)
    throw Error(`Given endpoint ref: ${endpointRef} is not valid `);
  try {
    /** 1. Get payload data*/
    reporter.addStep(
      this.testid,
      "info",
      `Getting the payload data for endpoint: ${endpointRef}`
    );
    let endpoint = "";
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
    if (!endpoint)
      throw Error(`Error getting endpoint:${endpoint} from the constants.json`);

    /** 2. Make get call by using API helper */
    let res;
    let testid = this.testid;
    await browser.call(async function () {
      // @ts-ignore
      res = await apiHelper.GET(testid, browser.options.reqresBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM);
    });
    // @ts-ignore
    if (res.status !== 200) chai.expect.fail(`Failed getting users from :${browser.options.reqresBaseURL}/${endpoint}`);
    reporter.addStep(
      this.testid,
      "debug",
      `API response received, data: ${JSON.stringify(res.body)}`
    );
    /** 3. Store results */
    let data = JSON.stringify(res.body, undefined, 4);
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(
      this.testid,
      "info",
      `API response from ${endpoint} stored in json file`
    );
  } catch (err) {
    err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`;
    throw err;
  }
});
//#endregion
