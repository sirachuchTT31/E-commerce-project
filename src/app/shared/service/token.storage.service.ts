import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root",
})
export class TokenStorageService {
    signIn(token: any, name: any, lastname: any, user_profile: any, time_out: any) {
        localStorage.setItem("token", token)
        localStorage.setItem("name", name)
        localStorage.setItem("lastname", lastname)
        localStorage.setItem("user_profile", user_profile)
        localStorage.setItem("time_out", time_out)
    }
    signOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("lastname")
        localStorage.removeItem("user_profile")
        localStorage.removeItem("time_out")
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
}