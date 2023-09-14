const BuyBook = artifacts.require("./BuyBook.sol");

contract("BuyBook", () => {
    contract(
        "BuyBook.BuyingStart - modifier onlyBuyer",
        (accounts) => {
            it("User, which is not Buyer, can't buy book.", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                let notBuyer = accounts[4];
                try {
                    await buyBook.buyingStart(accounts[2], 500, 5, { from: notBuyer, gas: 200000, value: 500 });
                    assert.isTrue(false);
                } catch (error) {
                    assert.isTrue(buyer != notBuyer);
                    assert.equal(error.reason, "The caller must be the buyer");
                }
            });
        }
    );
    contract(
        "BuyBook.BuyingStart - modifier onlyBuyer",
        (accounts) => {
            it("User, which is not Buyer, can't save book.", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                let notBuyer = accounts[4];
                await buyBook.buyingStart(accounts[2], 500, 5, { from: buyer, gas: 200000, value: 500 });
                try {
                    await buyBook.buyingEnd("Harry Potter", 5, { from: notBuyer, gas: 200000});
                    assert.isTrue(false);
                } catch (error) {
                    assert.isTrue(buyer != notBuyer);
                    assert.equal(error.reason, "The caller must be the buyer");
                }
            });
        }
    );
    contract(
        "BuyBook.BuyingStart - modifier onlyBuyer",
        (accounts) => {
            it("Only buyers can buy books.", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                try {
                    await buyBook.buyingStart(accounts[2], 500, 5, { from: buyer, gas: 200000, value: 500 });
                    assert.isTrue(true);
                } catch (error) {
                    assert.equal(error.reason, "The caller of the function must be a buyer");
                }
            });
        }
    );
    contract(
        "BuyBook.BuyingStart - modifier onlyBuyer",
        (accounts) => {
            it("Only buyers can save books.", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                await buyBook.buyingStart(accounts[2], 500, 5, { from: buyer, gas: 200000, value: 500 });
                try {
                    await buyBook.buyingEnd("Harry Potter", 5, { from: buyer, gas: 200000 });
                    assert.isTrue(true);
                } catch (error) {
                    assert.equal(error.reason, "The caller of the function must be a buyer");
                }
            });
        }
    );
    contract(
        "BuyBook.BuyingStart - modifier onlyWhenBuying",
        (accounts) => {
            it("Buyer can't buy a book when the status is not for start buying", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                await buyBook.buyingStart(accounts[2], 500, 5, { from: buyer, gas: 200000, value: 500 });
                let status = await buyBook.getStatusTransaction();
                try {
                    await buyBook.buyingStart(accounts[2], 500, 5, { from: buyer, gas: 200000, value: 500 });
                    assert.isTrue(false);
                } catch (error) {
                    assert.isTrue(status != 0);
                    assert.equal(error.reason, "The function can be called only while buying!");
                }
            })
        }
    );
    contract(
        "BuyBook.BuyingStart - modifier onlyWhenBuying",
        (accounts) => {
            it("Buyer can't save a book when the status is not for end buying", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                let status = await buyBook.getStatusTransaction();
                try {
                    await buyBook.buyingEnd("Harry Potter", 5, { from: buyer, gas: 200000});
                    assert.isTrue(false);
                } catch (error) {
                    assert.isTrue(status != 1);
                    assert.equal(error.reason, "The function can be called only after buying!");
                }
            })
        }
    );
    contract(
        "BuyBook.BuyingStart - modifier onlyWhenBuying",
        (accounts) => {
            it("Buyer can buy a book when status is for start of buying and the book can be saved when status is for end of buying", async () => {
                let buyBook = await BuyBook.deployed();
                let buyer = await buyBook.buyer();
                await buyBook.buyingStart(accounts[2], 500, 5, { from: buyer, gas: 200000, value: 500 });
                let status = await buyBook.getStatusTransaction();
                let expectedStatus = 1;
                assert.equal(
                    status.valueOf(),
                    expectedStatus,
                    "The current status transaction is not set to end of buying"
                );
                await buyBook.buyingEnd("Harry Potter", 5, { from: buyer, gas: 200000});
                let newStatus = await buyBook.getStatusTransaction();
                let newExpectedStatus = 0;
                assert.equal(
                    newStatus.valueOf(),
                    newExpectedStatus,
                    "The current status transaction is not set to start of buying"
                )
            })
        }
    );
})

