const exampleTest = `const etherlime = require('../../index.js');
const LimeFactory = require('../../test/testContracts/LimeFactory.json')

describe('Lime Factory example', function () {

    let accountFour = accounts[3];
    let deployer;
    let limeFactoryInstance;

    before(async function () {
        deployer = new etherlime.EtherlimeGanacheDeployer(accountFour.secretKey);
        limeFactoryInstance = await deployer.deploy(LimeFactory)
    });

    it('should create lime', async () =>  {
        const createTransaction = await limeFactoryInstance.contract.createLime("newLime", 6, 8, 2)
        let lime = await limeFactoryInstance.contract.limes(0);
        assert.equal(lime.name, 'newLime');
        assert.isAddress(limeFactoryInstance.contractAddress)
    });

    it('should revert', async () => {
        await assert.revert(limeFactoryInstance.contract.createLime("newLime", 0, 8, 2))
    });

    it('should reject revert', async () => {
        let result;
        try {
            await assert.revert(limeFactoryInstance.contract.createLime("newLime", 5, 8, 2))
        } catch(error){
            result = error.message
        }
        
       assert.equal(result, "assert.fail()")
    });

    it('should emit event', async () => {
        await utils.timeTravel(deployer.provider, 6000)
        const createTransaction = await limeFactoryInstance.contract.createLime("newLime", 5, 8, 2);
        const transactionReceipt = await limeFactoryInstance.verboseWaitForTransaction(createTransaction);
        let logs = utils.parseLogs(transactionReceipt, limeFactoryInstance.contract, 'FreshLime')
        assert(logs.length > 0, "No event was thrown")
        
        let event = utils.hasEvent(transactionReceipt, limeFactoryInstance.contract, 'FreshLime')
        assert.isTrue(event);
    });

});`

module.exports = {
    exampleTest
}
