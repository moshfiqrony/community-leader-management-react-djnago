const users = {
    id: 1,
    phone: '01722667722',
    name: 'Md. Moshfiqur Rahman Rony',
    role: 'cl',
    active: false,
};


export default function () {
    return (
        {
            ...users,
            isLogin: true,
        })
}