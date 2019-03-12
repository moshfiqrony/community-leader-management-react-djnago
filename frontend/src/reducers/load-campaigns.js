const users = {
    id: 1,
    phone: '01722667722',
    name: 'Md. Moshfiqur Rahman Rony',
    role: 'cl',
    active: true,
};


export default function () {
    return (
        {
            ...users,
            isLogin: true,
        })
}