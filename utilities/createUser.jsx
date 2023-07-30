export const createUser = (user) => {
    const users = localStorage.getItem('users');

    if (users) {
        const userData = JSON.parse(users);
        const existingUser = userData.find((existingUser) => user?.email === existingUser?.email);

        if (existingUser) {
            return 'User already exists';
        } else {
            userData.push(user);
            localStorage.setItem('users', JSON.stringify(userData));

            const loginUser = {
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.image
            };
            localStorage.setItem('currentUser', JSON.stringify(loginUser));

            return 'User created successfully'
        }
    } else {
        const users = [user];
        localStorage.setItem('users', JSON.stringify(users));

        const loginUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image
        };
        localStorage.setItem('currentUser', JSON.stringify(loginUser));

        return 'User created successfully'
    }
};

// export const createUser = async (user) => {
//     const users = localStorage.getItem('users');

//     // check existing user
//     if (users) {
//         const userData = JSON.parse(users);
//         const existingUser = userData.find((exist) => user?.email === exist?.email);

//         if (existingUser) {
//             return 'User already exists';
//         }
//     } else {
//         localStorage.setItem('users', JSON.stringify([]));
//     }

//     // Image Upload to imgBB
//     try {
//         if (user.image) {
//             const imgBbApiKey = 'ce656017d1826ee016d5524022fd5d67';
//             const formData = new FormData();
//             formData.append('image', user.image);

//             const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBbApiKey}`, formData);
//             user.image = response.data.data.url;
//         }
//     } catch (error) {
//         console.error('Error uploading image to imageBB', error);
//         return 'Failed to upload image';
//     }

//     // store user data in lS
//     const userData = JSON.parse(localStorage.getItem('users'));
//     userData.push(user);
//     localStorage.setItem('users', JSON.stringify(userData));

//     // data for current user
//     const loginUser = {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         image: user.image
//     };
//     localStorage.setItem('currentUser', JSON.stringify(loginUser));

//     return 'User created successfully';
// };


// export const createUser = async (user) => {
//     const users = localStorage.getItem('users');

//     if (users) {
//         // ...existing user check and other logic

//         // Image upload to ImgBB
//         try {
//             if (user.image) {
//                 const imgBbApiKey = '3ea6cc1d53aa36bfa89837f96a9d4750'; // Replace with your ImgBB API key
//                 const formData = new FormData();
//                 formData.append('image', user.image);

//                 const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBbApiKey}`, formData);
//                 user.image = response.data.data.url;
//             }
//         } catch (error) {
//             console.error('Error uploading image to ImgBB:', error);
//             return 'Failed to upload image';
//         }

//         // ...continue with the existing user creation logic

//     } else {
//         // ...handle case when there are no existing users

//         // Image upload to ImgBB
//         try {
//             if (user.image) {
//                 const imgBbApiKey = 'YOUR_IMGBB_API_KEY'; // Replace with your ImgBB API key
//                 const formData = new FormData();
//                 formData.append('image', user.image);

//                 const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBbApiKey}`, formData);
//                 user.image = response.data.data.url;
//             }
//         } catch (error) {
//             console.error('Error uploading image to ImgBB:', error);
//             return 'Failed to upload image';
//         }

//         // ...continue with the new user creation logic

//     }
// };