import type { Handle } from "@sveltejs/kit"
export const handle: Handle = async ({ event, resolve }) => {
   event.locals.something = "Whatever i want!"
   // stage 1
   const response = await resolve(event) // stage 2
   //Stage 3
   return response
}