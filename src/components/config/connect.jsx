
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

    getLogs: async (props) => {

        const response = await api.get('/logs', {
            headers: {
                'Authorization': `${localStorage.getItem('autorization')}`,
            },
        })
            .then(res => {

                return res

            }).catch(err => {

                return err.response
            })



        return response

    },

    deletLogs: async (props) => {

        const response = await api.get('/deleteLogs', {
            headers: {
                'Authorization': `${localStorage.getItem('autorization')}`,
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
    }


}


export default connect;