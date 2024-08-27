export function isNotAListOrEmptyList(list: any) {
    return list === undefined || ( !Array.isArray(list) ? true :  list.length <= 0 );
}