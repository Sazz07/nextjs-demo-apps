import * as Yup from 'yup';

// .test('is-upperCase', '*First letter must be uppercase', value => {
//     console.log("🚀 ~ file: index.js:7 ~ password:Yup.string ~ value:", value)
//     if (value) {
//         const firsLetter = value[0];
//         return firsLetter === firsLetter.toUpperCase()
//     }
//     return false;
// })

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required('*Please enter your name'),
    email: Yup.string().email().required('*Please enter your email'),
    password: Yup.string().min(6).required('*Please enter your password'),
    confirm_password: Yup.string().required('*Please confirm password').oneOf([Yup.ref('password'), null], '*Password must be matched')
});