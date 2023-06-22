// See https://kit.svelte.dev/docs/types#app

import type { UserDto } from "car-api";

// for information about these interfaces
declare global {
	// myComponent.ts
	export class MyComponent {
		// Your component logic here
	}
	declare namespace App {
		// interface Error {}
		interface Locals {
			user: UserDto | null
		}
		// interface PageData {}
		// interface Platform {}
	}

}
export { };