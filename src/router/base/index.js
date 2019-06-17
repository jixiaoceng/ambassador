/*
 * @Author: 季芳莉 
 * @Date: 2019-06-05 11:05:03 
 * @Last Modified by: 季芳莉
 * @Last Modified time: 2019-06-10 19:43:55
 */
import Layout from '@/views/layout/Layout'
import myInvitation from '@/views/ambassador/myInvitation'
import sharingMaterials from '@/views/ambassador/sharingMaterials'
import personalInformation from '@/views/ambassador/personalInformation'
const baseRouterMap = [
    {
        path: '*',
        name: 'login',
        component: () => import ('@/views/login/login') //登录
    },
    {
        path: '/register',
        name: 'register',
        component: () => import ('@/views/login/register') //注册
    },
    {
        path: '/ambassador/addDetails',
        name: 'addDetails',
        component: () => import ('@/views/ambassador/addDetails') //信息录入
    },
    {
        path: '/ambassador',
        component: Layout,
        children: [
            {
              path: 'myInvitation',
              component: myInvitation
            },
            {
                path: 'sharingMaterials',
                component: sharingMaterials
            },
            {
                path: 'personalInformation',
                component: personalInformation
            }
        ]
    }
]

export default baseRouterMap