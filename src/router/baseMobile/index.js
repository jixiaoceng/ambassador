/*
 * @Author: 季芳莉 
 * @Date: 2019-06-05 11:05:03 
 * @Last Modified by: 季芳莉
 * @Last Modified time: 2019-06-10 19:43:55
 */
import Layout from '@/viewsMobile/layout/Layout'
import myInvitation from '@/viewsMobile/ambassador/myInvitation'
import sharingMaterials from '@/viewsMobile/ambassador/sharingMaterials'
import personalInformation from '@/viewsMobile/ambassador/personalInformation'
import contactUs from '@/viewsMobile/ambassador/contactUs'

const baseRouterMap = [
    {
        path: '*',
        name: 'login',
        component: () => import ('@/viewsMobile/login/login') //登录
    },
    {
        path: '/register',
        name: 'register',
        component: () => import ('@/viewsMobile/login/register') //注册
    },
    {
        path: '/ambassador/addDetails',
        name: 'addDetails',
        component: () => import ('@/viewsMobile/ambassador/addDetails') //信息录入
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
            },
            {
                path: 'contactUs',
                component: contactUs
            }
        ]
    }
]

export default baseRouterMap