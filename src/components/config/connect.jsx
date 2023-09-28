
import api from "./api";
import config from './.config.jsx';

const connect = {



    login: async (props) => {

        const response = await api.post('/user/login', {

            email: props.email,
            password: props.password

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response
    },

    generateNewAcc: async (props) => {


        const response = await api.post('/user/solicitacao-nova-conta', {

            email: props.email,
            password: props.password,
            name: props.name,
            tel: props.tel,
            msg: props.msg

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response

    },

    getFgtsStatus: async (cpf, id) => {

        const parans = {
            cpf: cpf,
            id: id
        }

        const response = await api.post('/fgts/saldo', parans,)
            .then(res => {

                return res.data

            }).catch(err => {

                return err.response
            })



        return response

    },

    getFtgsTable: async (params) => {

        const response = await api.post('/fgts/getTable', {
            params
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })



        return response.data;

    },

    getNotify: async (props) => {




        const response = await api.post('/user/solicicoes', {

            user: JSON.stringify(props)

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response
    },

    resolveNotify: async (props) => {


        const response = await api.post('/user/solicitacoes/resolve', {
            user: props.user,
            newUser: props.newUser,
            aceito: props.aceito

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                console.log(res)
                return res

            }).catch(err => {

                return err.response
            })

        return response
    },

    updateUser: async (props) => {


        const response = await api.post('/user/update', {

            email: props.email,
            password: props.password,
            name: props.name,
            oldPassword: props.oldPassword,
            token: props.token

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response

    },

    getUsers: async (props) => {


        const response = await api.post('/user/all', {

            token: props

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response

    },

    deleteUser: async (props) => {


        const response = await api.post('/user/deleteuser', {

            token: props.token,
            userId: props.deleteId

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response

    },

    getHistory: async (props) => {

        const response = await api.post('/fgts/history', {

            token: props.token,
            userId: props.userId

        }, {
            headers: {
                //  'Authorization': `${sessionStorage.getItem('authToken')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })

        return response
    }
    
}


export default connect;