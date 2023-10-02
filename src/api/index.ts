import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { RESPONSE_CODE } from '@composables/enums'
import router from '@/router'

export default class request {
    private instance: AxiosInstance | undefined

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.instance.interceptors.request.use(
            (config) => {
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                switch (response.data.code) {
                    case RESPONSE_CODE.redirect_login:
                        router.push({ name: response.data.data })
                        return Promise.reject(response)
                    case RESPONSE_CODE.server_restart:
                        ElNotification.info({
                            position: 'bottom-right',
                            message: response.data.message,
                            duration: 5000,
                        })
                        router.push({
                            name: 'login',
                            query: { redirect: 1 },
                        })
                        return Promise.reject(response)
                    default:
                        return Promise.resolve(response.data)
                }
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }

    public get(url: string, param?: any) {
        return new Promise((resolve, reject) => {
            this.instance
                ?.get(url, { params: param })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    public post(url: string, data?: any) {
        return new Promise((resolve, reject) => {
            this.instance
                ?.post(url, data)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}
