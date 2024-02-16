// add type to express request object
declare namespace Express {
    export interface Request {
        auth: {
            session: ISessionDocument,
            user: IUserDocument
        } | null
    }
}