// /** @type {import('@sveltejs/kit').Handle} */
// import { API } from './logic/api';
// export async function handle({ event, resolve }) {
//    event = await API.Car.apiCarGet(event.cookies.get(''));

//    const response = await resolve(event);
//    response.headers.set('x-custom-header', 'potato');

//    return response;
// }