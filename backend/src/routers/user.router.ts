import { Router } from "express";
import { injectable } from "inversify";
import { auth, user } from "../di/container.di";

@injectable()
export default class UserRouter {
    router:Router;
    constructor () {
        this.router = Router();
        this.intializeRouter();
    }
    public intializeRouter () {
        this.router.post("/signUp", user.register);
        this.router.get("/confirm-email/:id/:token", user.confirmEmail);
        this.router.post("/login", user.login);
        this.router.get("/profile", auth.authenticateUser, user.getUserProfile);
        this.router.get("/admin/users", auth.authenticateUser, auth.authorizedRoles("admin"), user.getAllUsers);

    }
    public getRouter =():Router => {
        return this.router;
    }
}