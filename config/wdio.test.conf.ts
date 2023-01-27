import {config as baseConfig} from "../wdio.conf.js"
export const config = Object.assign(baseConfig, {
    // All test env specific key val pairs
    environmemt: "TEST",
    sauceDemoURL: "https://www.saucedemo.com"
})