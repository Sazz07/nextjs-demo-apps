export const createUser = (user) => {
    const users = localStorage.getItem('users');

    if (users) {
        const userData = JSON.parse(users);
        const existingUser = userData.find((exist) => user?.email === exist?.email);

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
            localStorage.setItem('createUser', JSON.stringify(loginUser));

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