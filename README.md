# Dcrtimestamp 

#### Timpestamp files with the Decred blockchain.

Dcrtimestamp is a web application which provides an easy and free timestamping service.

**The files are not stored in the server**. It uses [dcrtime](https://github.com/decred/dcrtime) as backend to store and anchor the files signatures. 


### Development

To start the development server:

`yarn && yarn start` 

### Production

To generate the production bundle for mainnet:

`yarn && yarn build`

For testnet: 

`yarn && yarn build-testnet`




