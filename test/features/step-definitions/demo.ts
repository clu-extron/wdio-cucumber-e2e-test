import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Google page is opened$/, async function () {
  console.log(`Before opening browser...`);
  await browser.url("https://www.google.com");
  await browser.pause(1000);
  console.log(`After opening browser...`);
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem: ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let ele = await $(`<h3>`);
  ele.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  console.log(`>> expectedURL: ${expectedURL}`);
  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});

/**
 * Web Interactions
 */
Given(/^A web page is opened$/, async function () {
  // await browser.url("/inputs");
  await browser.url("/upload");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async function () {
  //#region 1. InputBox
  /**
   * Actions:
   * 1) Type into input box
   * 2) Clear the field and type or just add value
   * 3) Click and Type
   * 4) Slow typing
   */
  //   let num = 12345;
  //   let strNum = num.toString();

  //   let ele = await $(`[type=number]`);
  //   await ele.click();
  //   await ele.setValue(strNum);

  //   for(let i = 0; i < strNum.length; i++){
  //     let charStr = strNum.charAt(i)
  //     await browser.pause(1000)
  //     await browser.keys(charStr)
  //   }

  //   DEBUG: await browser.debug();
  // #endregion

  //#region 2. Dropdown
  /**
   * Actions:
   * 1) Assert default option is selected
   * 2) Select by attribute, text, index
   * 3) Get a list of options
   */

  // let ele = await $('//select/option[@selected="selected"]');
  // let val = await ele.getText();
  // chai.expect(val).to.equal("Please select an option");

  // let dropDownEle = $("#dropdown");
  // await dropDownEle.selectByVisibleText("Option 2");
  // await dropDownEle.selectByAttribute("value", 2);
  // dropDownEle.selectByIndex(2);

  // let eleArr = await $$(`select > option`);
  // let arr = [];
  // for (let i = 0; i < eleArr.length; i++) {
  //   let ele = eleArr[i];
  //   let val = await ele.getText();
  //   arr.push(val)
  //   console.log(val);
  // }
  // console.log(`>> Options Array: ${arr}`);
  //#endregion

  //#region 3. Checkbox
  /**
   * Actions:
   * 1) Select an option
   * 2) Unselect an option (if selected)
   * 3) Assert if option is selected
   * 4) Select all options
   */
  // let ele1 = await $(`//form[@id="checkboxes"]/input[1]`);
  // await ele1.click();
  // await browser.pause(1000);

  // await ele1.click();

  // let ele2 = await $(`//form[@id="checkboxes"]/input[2]`);
  // let isChecked = await ele2.isSelected();
  // chai.expect(isChecked).to.be.true;

  // await ele2.click();
  // await browser.pause(1000);
  // let eleArr = await $$(`//form[@id="checkboxes"]/input`);
  // for (let i = 0; i < eleArr.length; i++) {
  //   let ele = eleArr[i]
  //   if(!await ele.isSelected()){
  //     await ele.click();
  //   }
  // }
  //#endregion

  //#region 4. Windows Handling
  /**
   * Steps:
   * 1) Lauch the browser
   * 2) Open another windows
   * 3) Switch to the window based on title
   * 4) Switch back to the main window
   *
   * Methods used:
   * 1) getTitle()
   * 2) getWindowHandle()
   * 3) getWindowHandles()
   * 4) switchToWindow()
   */
  // await $(`=Click Here`).click();
  // await $(`=Elemental Selenium`).click();
  // let currentWinTitle = await browser.getTitle();
  // console.log(`>> currentWinTitle: ${currentWinTitle}`);

  // let winHandles = await browser.getWindowHandles();
  // for (let i = 0; i < winHandles.length; i++) {
  //   console.log(`>> Win handle: ${winHandles[i]}`);
  // }

  // await browser.switchToWindow(winHandles[2]);
  // currentWinTitle = await browser.getTitle();
  // console.log(`>> currentWinTitle: ${currentWinTitle}`);

  // await browser.switchToWindow(winHandles[0]);
  // currentWinTitle = await browser.getTitle();
  // console.log(`>> currentWinTitle: ${currentWinTitle}`);
  //#endregion

  //#region 5. Alerts/Pop up windows
  /**
   * Methods used:
   * 1) isAlertOpen()
   * 2) acceptAlert()
   * 3) dismissAlert()
   * 4) getAlertText()
   * 5) sendAlertText()
   */
  // await $(`button=Click for JS Alert`).click();
  // await $(`button=Click for JS Prompt`).click();
  // if (await browser.isAlertOpen()) {
    // await browser.pause(2000);
    // await browser.acceptAlert();

    // await browser.pause(2000);
    // await browser.dismissAlert();

  //   let alertText = await browser.getAlertText();
  //   console.log(`>> alertText: ${alertText}`);
  //   await browser.pause(1000);
  //   await browser.sendAlertText(`Hello JS Prompt...`);
  //   await browser.pause(2000);
  //   await browser.acceptAlert();
  // }

  //#endregion
  
  //#region 6. File upload
  await $(`#file-upload`).addValue(`${process.cwd()}/data/fileupload/dummy.txt`);
  await $('#file-submit').click();

  //#endregion
  await browser.debug();
});
