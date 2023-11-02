import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root",
})
export class TokenStorageService {
    cart_List: Array<any> = []
    signIn(user_name: any, token: any, name: any, lastname: any, user_profile: any, time_out: any , role : any , uid : any) {
        localStorage.setItem("user_name", user_name)
        localStorage.setItem("token", token)
        localStorage.setItem("name", name)
        localStorage.setItem("lastname", lastname)
        localStorage.setItem("user_profile", user_profile)
        localStorage.setItem("time_out", time_out)
        localStorage.setItem("r",role)
        localStorage.setItem("uid",uid)
    }
    signOut() {
        localStorage.removeItem("user_name")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("lastname")
        localStorage.removeItem("user_profile")
        localStorage.removeItem("time_out")
        localStorage.removeItem("r")
        localStorage.removeItem("uid")
    }
    countCart(length: any) {
        localStorage.setItem("cart_count", length)
    }
    saveCart(obj: any) {
        localStorage.setItem("cart", obj)
    }
    public get roleStorage(): string | null {
        return localStorage.getItem("r")
    }
    public get countcartStorage(): string | null {
        return localStorage.getItem("cart_count")
    }
    public get ItemcartStorage(): string | null {
        return localStorage.getItem("cart")
    }
    public get usernameStorage(): string | null {
        return localStorage.getItem("user_name")
    }
    public get tokenStorage(): string | null {
        return localStorage.getItem("token")
    }
    public get nameStorage(): string | null {
        return localStorage.getItem("name")
    }
    public get lastnameStorage(): string | null {
        return localStorage.getItem("lastname")
    }
    public get userprofileStorage(): string | null {
        return localStorage.getItem("user_profile")
    }
    public get timeoutStorage(): string | null {
        return localStorage.getItem("time_out")
    }
    public get userId(): string | null {
        return localStorage.getItem("uid")
    }
}