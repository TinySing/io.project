import request from '@/utils/request';

// 查询部门下拉树结构
export function treeSelect(data) {
  return request({
    url: 'system/dept/treeselect',
    method: 'get',
  });
}
// 查询部门下拉树结构
export function queryOrgTree(data) {
  return request({
    url: 'okr/mainPage/queryOrgTree',
    method: 'post',
  });
}
