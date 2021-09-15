import { NextApiResponse } from "next";
import NextAuth from "next-auth"

/**
 * Fixes: https://github.com/nextauthjs/next-auth/issues/1840
 * This dynamic route won't have priority over ./callback.ts route (https://nextjs.org/docs/routing/dynamic-routes).
 * 
 * FIXME: req types are internals (not exported) to next-auth (https://github.com/nextauthjs/next-auth/blob/main/types/internals/index.d.ts)
 */

export default (req: any, res: NextApiResponse): NextApiResponse => {
    const { provider, baseUrl } = req.options
    if(provider.type === "email" && req.method === "HEAD") {
        return res.redirect(baseUrl)
    }
    return NextAuth(req, res, req.options)
}
