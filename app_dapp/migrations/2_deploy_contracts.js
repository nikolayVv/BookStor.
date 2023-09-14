let BuyBook = artifacts.require("BuyBook");

module.exports = (deployer) => {
    deployer.deploy(BuyBook, 100);
};