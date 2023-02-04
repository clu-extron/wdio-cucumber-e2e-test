import {config as baseConfig} from "../wdio.conf.js"
export const config = Object.assign(baseConfig, {
    // All test env specific key val pairs
    environment: "TEST",
    sauceDemoURL: "https://www.saucedemo.com",
    reqresBaseURL: "https://reqres.in",
    nopCommerceBaseURL: "https://admin-demo.nopcommerce.com"
})