import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ReponseCodeEnum } from '@composables/enums'
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
                if (
                    response.data.code ===
                    ReponseCodeEnum.unauthorized.getCode()
                ) {
                    router.push({ name: response.data.data })
                    return Promise.reject(response)
                }
                return response.data
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
