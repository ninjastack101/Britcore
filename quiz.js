// Assuming you have already done "npm install fernet"
let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcJKz3TEGoYW_erhPepL4pITc7vQ98I_xDErofa5SPZgf4Rcisw_4cUZvJd3efdWIqhsJS8iyXN-tM4BFqVCoBIJX5yO-vWM1sYetUfN_AftFZW7TAfZwFl73UcIS2OtGBic2A1ivana1tGHXFabPtlLKGzNKndHxiIKDiAz-j54yx8x0RBznOo1-vERq2GpgPcc8z'
let token = new Fernet.Token({secret: secret, token: message, ttl:0})
console.log("token ===========>", token.decode());
