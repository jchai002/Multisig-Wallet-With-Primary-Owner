const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
);

function getTransanctionStatus(tx) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(tx, (err, res) => {
      if (err) {
        console.log("err: ", err);
        return reject(err);
      }
      var result = null;
      if (res) {
        console.log("getTransanctionStatus", res.logs);
        result = {
          blockNumber: res.blockNumber,
          status: res.status
        };
      }
      return resolve(result);
    });
  });
}

function pollForTransactionState(tx) {
  return new Promise(async function poll(resolve) {
    var result = await getTransanctionStatus(tx);
    // if the transaction is not mined
    if (!result || !result.blockNumber) {
      // recursive call to poll again
      console.log("Re-trying with hash", tx);
      setTimeout(poll.bind(null, resolve), 3000);
    } else {
      // otherwise stop polling and resolve
      resolve(result);
    }
  });
}

module.exports = { pollForTransactionState };
