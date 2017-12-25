import fetch from '@/utils/fetch'

export function postActivityList(xiaochu) {
	return fetch({
	    url: 'api/index.php?m=template&act=addtemplate',
	    method: 'post',
	    data:'data='+JSON.stringify(xiaochu)
	})
}
export function getActivityList(data) {
	return fetch({
	    url: 'api/index.php?m=template&act=productList',
	    method: 'post',
	    data:'data='+JSON.stringify(data)
	})
}
export function getruleList(data) {
	return fetch({
	    url: '/api/index.php?m=template&act=ruleList',
	    method: 'post',
	    data:'data='+JSON.stringify(data)
	})
}
export function changeinfo(muban_id) {
	return fetch({
	    url: '/api/index.php?m=template&act=templateInfo',
	    method: 'post',
	    data:'data='+JSON.stringify(muban_id)
	})
}
export function clearcookie(clear) {
	return fetch({
	    url: '/iwantcdm/xindex.php?m=muban&act=setcook',
	    method: 'post',
	    data:'data='+JSON.stringify(clear)
	})
}
export function categoryList(data) {
	return fetch({
	    url: '/api/index.php?m=template&act=categoryList',
	    method: 'post',
	    data:'data='+JSON.stringify(data)
	})
}