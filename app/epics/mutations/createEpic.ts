import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateEpic = z.object({
  name: z.string(),
  desc: z.string(),
})

export default resolver.pipe(resolver.zod(CreateEpic), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const epic = await db.epic.create({ data: input })

  return epic
})
