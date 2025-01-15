const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function hashMyPassword(password: string) {
    const hashed_password:string = await bcrypt.hash(password, saltRounds)
    return hashed_password
}

export async function checkMyPassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    console.log(match ? 'Passwords match' : 'Passwords do not match');
    return match;
}

// hashMyPassword(myPlaintextPassword).then(hashedPassword => {
//     checkMyPassword(myPlaintextPassword, hashedPassword);
// });
