# Dcrtimegui

**Dcrtimegui is a web application which provides an easy and free timestamping service using dcrtime as the backend.**

A hash of each submitted file is calculated and sent to a dcrtime server, which aggregates these hashes, organizes them into a merkle tree, hashes that tree down to a merkle root, and anchors that merkle root in the Decred blockchain once an hour.

Technical detail: This service, dcrtime and Decred use the sha256 hash function.

**The files are not stored in the server**. It uses 
[dcrtime](https://github.com/decred/dcrtime) as backend to store and anchor the
files hashes.


### Development

To start the development server:

`yarn && yarn start` 

### Production

To generate the production bundle for mainnet:

`yarn && yarn build`

For testnet: 

`yarn && yarn build-testnet`

### Verify and timestamp SHA256 hashes using URL parameters

Its possible to use the results route to verify and timestamp SHA256 digests 
directly. There are tree parameters to be set:

- **digests** (required): the hashes to be anchored separated by comma.
- **names** (optional): the name associated to each hash separated by comma. 
The names has to follow the same order as the digests are provided. Its used 
only for displaying purposes. If the name is not provided, the digest will be 
used as the name instead.
- **timestamp** (optional): if true, the hashes which aren't anchored yet will
 be sent to dcrtime for anchoring.

#### Usage

The following URL will verify the hashes of two files (file1.json and file2.txt),
the hashes which can't be found in the server will be uploaded for anchoring in
dcrtime.

```
https://localhost:3000/results?digests=11779c9e577ee238a61dc49227bc8cd8cbd7f8db60efb7d2d3336706d32b5372,fc11cc406688eb75d83ee3db77f4d1776b81de16ddba10738a7d3703299b7646&names=file1.json,file2.txt&timestamp=true
```




