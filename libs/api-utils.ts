import type { AuthContextDefault } from './interfaces';

interface Request {
	method: string;
	headers: any;
	credentials?: RequestCredentials;
	body?: any;
}

export interface ApiRequest {
	route: string;
	authContext?: AuthContextDefault;
	data?: any;
}
export interface ApiResponse {
	body?: any;
	ok: boolean;
	code?: number; // http code
	error?: {
		message?: string;
		stack?: string;
	};
}

async function send(method: string, path: string, authContext: AuthContextDefault, data?: any) {
	let headers;
	if (authContext?.token) {
		headers = {
			Authorization: `Bearer ${authContext.token}`,
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
		};
	} else {
		headers = {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
		};
	}
	const opts: Request = {
		method,
		headers,
	};

	if (data) {
		// We check if the data is already stringified and if not we stringify it
		opts.body = typeof data === 'string' ? data : JSON.stringify(data);
	} else if (method === 'POST') {
		opts.body = '{}'; // default empty body
	}

	let url: string = `${path}`;
	//console.log(`${method} ${url}`);
	return await fetch(url, opts);
}

function buildSuccessResponse(body: any, code?: number): ApiResponse {
	return {
		code,
		body,
		ok: true,
	};
}

function buildErrorResponse(message: string, stack?: string, code?: number): ApiResponse {
	return {
		code,
		error: {
			message,
			stack,
		},
		ok: false,
	};
}

function get({ route, authContext = {} }: ApiRequest) {
	return send('GET', route, authContext);
}

function post({ route, authContext = {}, data = null }: ApiRequest) {
	return send('POST', route, authContext, data);
}

function put({ route, authContext = {}, data = null }: ApiRequest) {
	return send('PUT', route, authContext, data);
}

function patch({ route, authContext = {}, data = null }: ApiRequest) {
	return send('PATCH', route, authContext, data);
}

function del({ route, authContext = {}, data = null }: ApiRequest) {
	return send('DELETE', route, authContext, data);
}

async function standardGet({ route, authContext = {} }: ApiRequest): Promise<ApiResponse> {
	try {
		const res = await get({ route, authContext });
		if (res.status === 200) {
			const body = await res.json();
			return buildSuccessResponse(body, res.status);
		} else {
			//TODO get server message in body ??
			return buildErrorResponse('GET failed - Unexpected status', '', res.status);
		}
	} catch (e: any) {
		return buildErrorResponse(e.message);
	}
}

async function standardPost({
	route,
	authContext = {},
	data = null,
}: ApiRequest): Promise<ApiResponse> {
	try {
		const res = await post({ route, authContext, data });
		if (res.status === 200 || res.status === 201) {
			const body = await res.json();
			return buildSuccessResponse(body, res.status);
		} else {
			//TODO get server message in body ??
			return buildErrorResponse('POST failed - Unexpected status', '', res.status);
		}
	} catch (e: any) {
		return buildErrorResponse(e.message);
	}
}

async function standardPut({ route, authContext = {}, data = null }: ApiRequest) {
	try {
		const res = await put({ route, authContext, data });
		if (res.status === 200) {
			const body = await res.json();
			return buildSuccessResponse(body, res.status);
		} else {
			//TODO get server message in body ??
			return buildErrorResponse('PUT failed - Unexpected status', '', res.status);
		}
	} catch (e: any) {
		return buildErrorResponse(e.message);
	}
}

async function standardPatch({ route, authContext = {}, data = null }: ApiRequest) {
	try {
		const res = await patch({ route, authContext, data });
		if (res.status === 200) {
			const body = await res.json();
			return buildSuccessResponse(body, res.status);
		} else {
			//TODO get server message in body ??
			return buildErrorResponse('PATCH failed - Unexpected status', '', res.status);
		}
	} catch (e: any) {
		return buildErrorResponse(e.message);
	}
}

async function standardDelete({ route, authContext = {} }: ApiRequest) {
	try {
		const res = await del({ route, authContext });
		if (res.status === 200) {
			return buildSuccessResponse(res.status);
		} else {
			return buildErrorResponse('DELETE failed - Unexpected status', '', res.status);
		}
	} catch (e: any) {
		return buildErrorResponse(e.message);
	}
}

export {
	get,
	post,
	put,
	patch,
	standardGet,
	standardPost,
	standardPut,
	standardPatch,
	standardDelete,
};
