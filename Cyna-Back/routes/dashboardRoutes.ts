import Router from 'koa-router'
const dashboardRouter = new Router()

dashboardRouter.get('/dashboard', async (ctx) => {
  ctx.body = { status: "ok" }
})

export default dashboardRouter // ✅ IMPORTANT : tu exportes bien le routeur
