import { Given } from "@wdio/cucumber-framework";
import logger from "../../helper/logger.js"

Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixTxt, userType, dataTable) {
    // DEBUG: console.log(`Test username: ${process.env.TEST_STD_USERNAME}`);
    // DEBUG: let dt = dataTable.hashes();
    // DEBUG: console.log(`>> The type of dt: ${typeof dt.constructor}`);
    // DEBUG: console.log(`>> The value of dt: ${JSON.stringify(dt)}`);
    // DEBUG: console.log(`>> The userType: ${userType}`);
    // DEBUG: console.log(`>> Given step Test ID: ${this.testid}`);
    logger.info(`${this.testid}: Started to login sauce demo app...`);
    /** 1. Launch browser */
    // @ts-ignore
    await browser.url(browser.options.sauceDemoURL);
    // DEBUG: console.log(`>> Test config values: ${JSON.stringify(browser.options)}`);

    await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
    await browser.maximizeWindow();

    /** 2. Login to inventory */
    try {
      await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
      await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
      await $(`#login-button`).click();
    } catch (err) {
      console.log(`Error in first login. Retrying...`);
      await browser.refresh();
      await browser.pause(2000);
      await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
      await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
      await $(`#login-button`).click();
    }
    this.appid = "Test World Obj";
  }
);
