const SHA256 = require('crypto-js/sha256');//javascript library to calculate hash of each block

class BlockCrypto{
    //constructor to initialize the properperties of each block
    constructor (index, current_time, info, prevHash=""){
        this.index = index;
        this.current_time = current_time;
        this.info = info;
        this.prevHash=prevHash;
        this.hash = this.computeHash();//calculat hash using SHA256
        console.log(`Block ${index} created...`);

    }
    computeHash() {
        return SHA256(
          this.index +
            this.prevHash +
            this.current_time +
            JSON.stringify(this.info)
              ).toString();
      }
}

class Blockchain{
    constructor(){
        //Genesis block
        this.block1chain = [this.initGenesisBlock()];
    }
    initGenesisBlock(){
        return new BlockCrypto(0, new Date().toISOString(), "initial Block in the Chain", "0")
    }
    //Last added block
    latestBlock(){
        return this.block1chain[this.block1chain.length-1];
    }
    //new block
    addNewBlock(newBlock) {
        newBlock.index = this.block1chain.length;
        newBlock.current_time = new Date().toISOString()
        newBlock.prevHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        newBlock.hash = newBlock.computeHash();
        //add new block to chain
        this.block1chain.push(newBlock);
    }

    //validate chain
    checkValidity(){
        //checking validity
        for (let i=1; i<this.block1chain.length; i++){
            const currentBlock = this.block1chain[i];
            const prevBlock = this.block1chain[i-1];
            //checking current block hash
            if (currentBlock.hash!==currentBlock.computeHash()){
                console.log('failed at =>currentBlock!==currentBlock.computeHash()')
                return false
            }
            //comparing current block hash with the next block
            if (currentBlock.prevHash !==prevBlock.hash){
                console.log('failed at =>currentBlock.prevHash !==prevBlock.hash')
                return false
            }
            return 'Blockchain passed validation test!!!...'
        }
    }
}

//create new blockchain
let pyroscoin = new Blockchain();
//Add blocks of transactions
pyroscoin.addNewBlock(new BlockCrypto({sender: "Patrick Oguaju", recipient: "Samuel Oguaju",quantity: 20}));
pyroscoin.addNewBlock(new BlockCrypto({sender: "Vivian Oguaju", recipient: "Patrick Oguaju",quantity: 78}));
pyroscoin.addNewBlock(new BlockCrypto({sender: "Rabin Yitzack",recipient: "Loyd Eve",quantity: 20 }));
pyroscoin.addNewBlock(new BlockCrypto({sender: "Anita Vyona",recipient: "Felix Mush",quantity: 349}));
  
console.log(JSON.stringify(pyroscoin, null, 4))
console.log(pyroscoin.checkValidity())

