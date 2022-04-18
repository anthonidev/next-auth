
export interface AuthState {
    access: (string | null)
    refresh: (string | null)
    isAuthenticated: boolean
    user: (User|null)
    loading: boolean

}

export interface User {
    id: number,
    email: string,
    first_name: string
    last_name: string
    get_full_name: string
    get_short_name: string
}